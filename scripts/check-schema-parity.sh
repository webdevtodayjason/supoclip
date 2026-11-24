#!/usr/bin/env bash
# Added 2026-11-24 by Jason Brashear / Pressloom (modified version of SupoClip, AGPL-3.0).
#
# Fails when a fresh install (init.sql + backend migrations) is missing a table or column
# that the Prisma migrations create. Fresh installs never run the Prisma migrations, so any
# such gap can break the frontend (for example, sign-up failing with Prisma P2022).
#
# Usage: PG_URL=postgresql://postgres@localhost:5432/postgres scripts/check-schema-parity.sh
# Needs psql and npx (Prisma CLI is fetched at the version pinned in frontend/package.json).
set -euo pipefail
export PGOPTIONS="${PGOPTIONS:--c client_min_messages=error}"

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PG_URL="${PG_URL:?set PG_URL to a Postgres URL with permission to create databases}"
SUFFIX="$$"
FRESH="parity_fresh_${SUFFIX}"
PRISMA_DB="parity_prisma_${SUFFIX}"

db_url() { # swap the database name in PG_URL
  python3 -c 'import sys,urllib.parse as u; p=u.urlsplit(sys.argv[1]); print(u.urlunsplit(p._replace(path="/"+sys.argv[2])))' "$PG_URL" "$1"
}
cleanup() {
  psql "$PG_URL" -qc "DROP DATABASE IF EXISTS $FRESH" -c "DROP DATABASE IF EXISTS $PRISMA_DB" >/dev/null 2>&1 || true
}
trap cleanup EXIT

psql "$PG_URL" -qc "CREATE DATABASE $FRESH" -c "CREATE DATABASE $PRISMA_DB"

echo "Building fresh-install schema (init.sql + backend migrations)..."
psql "$(db_url "$FRESH")" -q -v ON_ERROR_STOP=1 -f "$ROOT/init.sql" >/dev/null
for f in "$ROOT"/backend/src/migrations/sql/*.sql; do
  psql "$(db_url "$FRESH")" -q -v ON_ERROR_STOP=1 -f "$f" >/dev/null
done

echo "Building Prisma schema (prisma migrate deploy)..."
PRISMA_VERSION="$(sed -nE 's/.*"prisma": *"\^?([0-9.]+)".*/\1/p' "$ROOT/frontend/package.json")"
(cd "$ROOT/frontend" && DATABASE_URL="$(db_url "$PRISMA_DB")" \
  npx --yes "prisma@${PRISMA_VERSION}" migrate deploy --schema prisma/schema.prisma >/dev/null)

columns() {
  psql "$(db_url "$1")" -Atc "SELECT table_name || '.' || column_name FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name NOT IN ('_prisma_migrations', 'schema_migrations')
    ORDER BY 1"
}

missing="$(comm -13 <(columns "$FRESH") <(columns "$PRISMA_DB"))"
if [[ -n "$missing" ]]; then
  echo "Fresh installs are missing columns that Prisma expects:"
  echo "$missing" | sed 's/^/  /'
  echo "Add an idempotent migration under backend/src/migrations/sql/."
  exit 1
fi
echo "OK: fresh-install schema covers every Prisma table and column."

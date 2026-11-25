-- Modified version of SupoClip (AGPL-3.0). Added 2026-11-24 by Jason Brashear / Pressloom.
--
-- Fresh installs build the database from init.sql plus these backend migrations; the
-- Prisma migrations under frontend/prisma/migrations never run there. Prisma's User
-- model selects users.stripe_account_id on every create, so without this column every
-- Better Auth sign-up failed with P2022 ("column users.stripe_account_id does not exist").
--
-- Brings the backend-managed schema in line with the Prisma migration
-- 20261106150000_stripe_account_routing. Every statement is idempotent, so it is safe on
-- fresh installs, on broken self-hosted installs, and on databases where Prisma already
-- applied that migration.

ALTER TABLE users ADD COLUMN IF NOT EXISTS stripe_account_id VARCHAR(255);

ALTER TABLE stripe_webhook_events
  ADD COLUMN IF NOT EXISTS status VARCHAR(20) NOT NULL DEFAULT 'processed',
  ADD COLUMN IF NOT EXISTS claim_token VARCHAR(255),
  ADD COLUMN IF NOT EXISTS lease_expires_at TIMESTAMPTZ;

CREATE TABLE IF NOT EXISTS stripe_account_migrations (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  source_account VARCHAR(255) NOT NULL,
  source_customer VARCHAR(255) NOT NULL,
  source_subscription VARCHAR(255) NOT NULL,
  destination_account VARCHAR(255) NOT NULL,
  destination_customer VARCHAR(255) NOT NULL,
  destination_subscription VARCHAR(255),
  destination_schedule VARCHAR(255),
  stage VARCHAR(32) NOT NULL CHECK (stage IN ('prepared','source_stopped','destination_staged','destination_active','rollback_verified','cancelled')),
  revision INTEGER NOT NULL DEFAULT 0,
  paid_through TIMESTAMPTZ NOT NULL,
  source_stopped_verified BOOLEAN NOT NULL DEFAULT false,
  source_resumed_verified BOOLEAN NOT NULL DEFAULT false,
  destination_disabled_verified BOOLEAN NOT NULL DEFAULT false,
  destination_paid_invoice VARCHAR(255),
  cancellation_requested BOOLEAN NOT NULL DEFAULT false,
  recovery_required BOOLEAN NOT NULL DEFAULT false,
  review_reason TEXT,
  livemode BOOLEAN NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (source_account, source_customer),
  UNIQUE (destination_account, destination_customer),
  CHECK (source_account <> destination_account)
);

# Contributing to Pressloom Clips

Pressloom Clips is a modified version of [SupoClip](https://github.com/FujiwaraChoki/supoclip),
licensed under the [GNU Affero General Public License v3](LICENSE) (AGPL-3.0).

## Contribution license

Contributions are accepted under AGPL-3.0, the same license as the rest of the repository
(inbound = outbound). There is no separate grant to relicense your contribution. You represent
that you have the right to submit it and that it does not knowingly violate anyone's rights.

## Clean-room rule for upstream features

This fork is built on SupoClip commit `d2378a9` (18 November 2026), the last release published
under AGPL-3.0. Later upstream releases use the SupoClip Noncommercial Source License, which does
not allow Pressloom's use, so none of that code may enter this repository.

- Never merge, cherry-pick, copy or paraphrase code from upstream SupoClip after `d2378a9`.
- To rebuild a feature that exists upstream, write a spec from public material only (release
  notes, pull request titles, documentation, the hosted app's behavior) and implement it without
  reading upstream code. Keep the spec with the change.
- Don't add the upstream repository as a git remote in a working clone.

## Notices

- Keep existing copyright and license notices.
- Mark files you change with a short "Modified by Pressloom" note and the date (AGPL-3.0 §5a).
- Don't use the SupoClip name or logo as branding. Naming SupoClip as the upstream project
  (attribution) is fine.

## Development

See [README.md](README.md) and [CLAUDE.md](CLAUDE.md) for local development instructions.

## Changelog

If a change is visible to people using the app, add a line to [CHANGELOG.md](CHANGELOG.md) under
today's date (`## YYYY-MM-DD`, newest first), tagged **New**, **Improved**, **Fixed** or
**Under the hood**. Don't include customer names, email addresses, user IDs or other private
details.

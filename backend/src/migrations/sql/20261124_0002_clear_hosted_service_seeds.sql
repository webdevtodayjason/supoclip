-- Modified version of SupoClip (AGPL-3.0). Added 2026-11-24 by Jason Brashear / Pressloom.
--
-- Earlier migrations seeded content from the hosted SupoClip service: a "degraded" video
-- downloads incident and a creator-program announcement. Every new install showed both. Clear
-- them, but only rows still exactly as seeded, so anything an admin has edited stays as it is.

UPDATE service_statuses
SET status = 'operational',
    headline = 'Operational',
    description = 'Video downloads are working normally.',
    updated_at = CURRENT_TIMESTAMP
WHERE id = 'video-downloads'
  AND status = 'degraded'
  AND headline = 'Investigating'
  AND description LIKE 'We are investigating slow video downloads.%';

DELETE FROM announcements
WHERE id = 'creator-program-2026-10'
  AND href = '/affiliate'
  AND title = 'The creator program is open';

"""Product branding for this install.

Added 2026-11-24 by Jason Brashear / Pressloom (modified version of SupoClip, AGPL-3.0).
User-facing text says Pressloom Clips; the X-SupoClip-* webhook headers keep their names
because existing receivers verify them.
"""

import os

BRAND_NAME = "Pressloom Clips"
# Address users can reply to; unset means emails carry no Reply-To and pages say
# "contact your administrator".
SUPPORT_EMAIL = os.getenv("SUPPORT_EMAIL", "").strip()


def support_contact() -> str:
    return SUPPORT_EMAIL or "your administrator"

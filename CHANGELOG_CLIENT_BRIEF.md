# Client Brief Implementation Changelog

## Scope 1 In-Scope Fixes Finalized

### 1. Global identity and consistency
- Standardized naming to **`TYCHERA Investments Ltd`** across UI, metadata, JSON-LD, and contact email templates.
- Confirmed role title usage is **`Chief Executive Officer`** and removed any `Managing Director` display copy.
- Enforced approved slogan usage: **`Clarity in decisions. Enduring outcomes.`**

### 2. Logo usage (approved assets)
- Header logo: `/images/tychera-logo-color-final.svg`
- Footer logo: `/images/tychera-logo-black-final.svg` (kept CSS inversion behavior for dark footer)
- Structured data logo updated to approved asset path.
- OG/Twitter metadata image references switched to approved brand assets:
  - `/images/tychera-logo-color-final.svg`
  - `/images/tychera-logo-black-final.svg`
- Existing favicon handling retained.

### 3. Homepage and EN/FR content alignment
- Homepage hero kept as short early block with reduced headline size (`text-3xl md:text-4xl lg:text-5xl`).
- Hero subtitle set to slogan-only in EN and FR.
- Pillars kept at exactly four with updated validated wording and order:
  1. Financial Engineering
  2. Project Structuring
  3. Project Finance
  4. Guarantee Structuring
- Synchronized validated Expertise copy across all Scope 1 surfaces:
  - `messages/en.json` and `messages/fr.json`
  - homepage fallback services
  - expertise page fallback services and display order
  - Sanity seed defaults (`seed-content.ts`, `seed-all-content.ts`)
- Updated FR expertise hero subtitle to the validated institutional paragraph equivalent.
- Removed legacy pillar labels from contact request labels (`Fund Management` / `Gestion de Fonds`) in UI and email flow mappings.

### 4. Institution/company profile copy (no structural expansion)
- Preserved existing `/institution` route structure (no new route/navigation changes).
- Institution narrative uses corporate **About / Vision / Mission** profile blocks (EN/FR).
- Kept personal CV-style timeline details out of the rendered institution profile.
- Fixed duplicated Team rendering: page now has one cohesive Team/Leadership section.
- Public Team/Leadership display now shows only Kamal (leadership); Hawa remains in CMS data and is not deleted.
- Added subtle team-support line and retained the "Institutional Team DNA" block.

### 5. Sanity seed/default alignment (copy-only)
- Updated `scripts/seed-content.ts` ordering/icons to match the validated 4-pillar model.
- Updated `scripts/seed-all-content.ts` service titles/descriptions/order to match Scope 1 validated model.
- Updated `scripts/seed-site-settings.ts` company name casing to `TYCHERA Investments Ltd`.
- Updated `scripts/seed-all-content.ts` to non-destructive behavior (no deletion of existing CMS records).
- No Sanity schema changes were made.

### 6. SEO and metadata hardening
- Updated metadata titles and publishers/siteName casing to `TYCHERA Investments Ltd`.
- Standardized page meta descriptions to the approved slogan and removed legacy bridge phrasing.
- Kept sitemap and robots structure unchanged.

## Out-of-Scope (deferred to Scope 2)
- Dedicated "The Institution" page expansion (beyond copy-only adjustments)
- Full Core Values / Business Sectors visual sections
- Portuguese locale support
- Careers page
- Letterhead deliverable

See: `SCOPE2_CHANGE_REQUESTS.md` for rationale, requirements, and effort sizing.

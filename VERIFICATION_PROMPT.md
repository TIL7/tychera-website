# QA Verification Prompt: TYCHERA Website Implementation

**Role:** You are a Quality Assurance Specialist verifying the implementation of the "TYCHERA Website Implementation Brief" against the current codebase/deployment.

**Objective:** Verify that ALL in-scope content and structural updates have been applied correctly in both English (EN) and French (FR), and confirm that out-of-scope items have been strictly excluded.

---

## 1. Global Identity & Consistency
- [ ] **Company Name:** Verify "TYCHERA Investments Ltd" is used consistently in Header, Footer, and Metadata. (Check for correct casing).
- [ ] **Logos:**
    - [ ] **Header:** Displays the **Colored** logo (`/images/tychera-logo-color-final.svg`).
    - [ ] **Footer:** Displays the **Black** logo (`/images/tychera-logo-black-final.svg`) (Note: it may be inverted/white via CSS, but source must be the black file).
    - [ ] **Structured Data / Social:** JSON-LD logo and OG/Twitter image references point to approved brand assets (no legacy logo path).
    - [ ] **Favicon:** Confirmed as the original/existing favicon (no change).
- [ ] **Role Titles:**
    - [ ] Search for "Managing Director" -> Should be **0 results**.
    - [ ] Search for "Chief Executive Officer" -> Should be present for Kamal Alawo ADJAYI.

## 2. Content Verification (Check both EN & FR)

### Homepage (Hero Section)
- [ ] **Headline:** Matches "Institutional Financial Solutions for Africa" (or FR equivalent).
- [ ] **Subtitle/Slogan:** Matches **"Clarity in decisions. Enduring outcomes."** ONLY.
    - [ ] **Critical Check:** Ensure the phrase *"Le pont entre capital international et potentiel africain"* is **REMOVED** from the immediate slogan/subtitle area and Footer.
- [ ] **Font Size:** Visually confirm the main headline is not aggressively large (should have been slightly reduced, e.g., `text-5xl` instead of `text-6xl`).

### Expertise / Pillars of Excellence
- [ ] **Structure:** Verify exactly 4 pillars are listed:
    1.  Financial Engineering
    2.  Project Structuring
    3.  Project Finance
    4.  Guarantee Structuring
- [ ] **Content:** Read the descriptions for each pillar. They must match the *Validated Content* from the Implementation Brief exactly.

### The Institution / Company Profile
- [ ] **Tone:** Confirm the narrative is **corporate**, not personal.
- [ ] **Personal Bio:** Verify that personal CV details (previous roles, specific past dates not related to Tychera) are **HIDDEN/REMOVED**.
- [ ] **Vision/Mission:** Verify the content matches the "About Us", "Vision", and "Mission" texts from the brief.
- [ ] **Team/Leadership Rendering:** Verify there is a single cohesive Team/Leadership section (no duplicated Team block), with only Kamal displayed publicly as leadership.

## 3. SEO & Metadata
- [ ] **Page Titles:** Should contain "TYCHERA Investments Ltd" and the relevant page name.
- [ ] **Meta Descriptions:**
    - [ ] Should be exactly "Clarity in decisions. Enduring outcomes." where Scope 1 metadata rules apply.
    - [ ] **Negative Check:** Ensure "Le pont entre capital..." is NOT in the meta description.

## 4. Out-of-Scope (Negative Testing)
*Confirm that the following have NOT been implemented as new features:*
- [ ] **No New Pages:** Ensure no new separate routes (like `/institution` as a full independent page layout) were created if they didn't exist or weren't requested as simple content updates.
    - [ ] Existing route set remains unchanged (`/`, `/expertise`, `/institution`, `/contact`, locale-prefixed variants).
- [ ] **No New "Core Values" Sections:** Unless they fit into existing "About" blocks, verify no complex new UI components were built for "Business Sectors" or "Core Values" lists.

## 5. Technical Health
- [ ] **Linting:** `npm run lint` passes with no errors.
- [ ] **Build:** `npm run build` completes successfully.

# Prompt: Fix Content Alignment & Discrepancies (EN/FR)

**Role:** You are a Detail-Oriented Content Manager & Developer.

**Context:** 
We have implemented content changes based on `TYCHERA Website Implementation Brief_kamal.md`, but inconsistencies have been introduced between the English (EN) and French (FR) versions. The French version currently has incorrect content in the Hero section, and the Homepage Teaser/Quote section is using the Slogan incorrectly in English.

**Source of Truth:** 
- `TYCHERA Website Implementation Brief_kamal.md` (for validated English copy).
- For French Content: It must be a professional, direct translation of the **Validated English Content** from the brief. Do not use "placeholder" French text or slogans where detailed paragraphs belong.

**Task Checklist:**

## 1. Hero Section (Homepage)
**Issue:** The English and French Hero sections do NOT match. 
- **English (Correct):** 
  - Title: "Institutional Financial Solutions for Africa"
  - Subtitle: "TYCHERA Investments Ltd provides institutional-grade financial solutions tailored to..." (Long paragraph).
- **French (Incorrect):** 
  - Current Title: "Architecte du Financement..." (Incorrect).
  - Current Subtitle: "Clarity in decisions. Enduring outcomes." (Incorrect - this is the slogan).

**Action:**
- Update `messages/fr.json` -> `hero`:
    - **Title:** Translate "Institutional Financial Solutions for Africa" to French (e.g., "Solutions Financières Institutionnelles pour l'Afrique").
    - **Subtitle:** Translate the *entire* English subtitle paragraph ("TYCHERA Investments Ltd provides...") into French. **Remove** the slogan from this field.

## 2. Homepage Teaser / CEO Quote
**Issue:** The "Quote" on the homepage (Teaser section) currently displays the Slogan ("Clarity in decisions...") in English. This is **WRONG**. The Slogan belongs in the footer, not as the CEO's personal quote.
- **French (Reference):** Uses a long narrative quote ("La transformation de l'Afrique nécessite...").

**Action:**
- Update `messages/en.json` -> `homepage.teaser`:
    - **Quote:** Replace the Slogan with the English translation of the text currently found in `messages/fr.json` ("La transformation de l'Afrique nécessite des partenariats structurés..."). *Infer/Translate this text back to English to match the tone of the "old" content the user referenced.*
    - **Context:** Ensure the context string aligns with this long quote.

## 3. Services / Expertise Alignment
**Issue:** Ensure French service descriptions match the *Validated Content* from the Brief (which is in English).
**Action:**
- Review `messages/fr.json` -> `pillars.services`.
- For each service (Financial Engineering, Project Structuring, Project Finance, Guarantee Structuring):
    - Ensure the French description is a **faithful translation** of the **Validated Content** block found in the Brief (PDF/MD).
    - If the current French text is a "legacy" description that differs in meaning from the Brief's English text, overwrite it with a new translation of the Brief's text.

## 4. Final Review
- **Slogan Placement:** Ensure "Clarity in decisions. Enduring outcomes." appears **ONLY** in the Footer (and `institution` quote if specifically requested there, but NOT in the Hero or Homepage Teaser).
- **Consistency:** EN and FR pages must have the same *structure* of content (Title + Paragraph), just in different languages.

**Output:**
- Modify `messages/en.json` and `messages/fr.json`.
- Run `npm run build` to verify no breaking changes.

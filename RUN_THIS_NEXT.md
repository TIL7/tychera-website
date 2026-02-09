# 🚀 Next Steps - Execute These Commands

## ✅ Phase 1: UI Fixes (COMPLETE)

All critical UI fixes have been implemented:
- Header navigation cleaned up (CTA button removed)
- Expertise page refactored with zig-zag layout
- Language toggle bug fixed
- Institution section properly linked

---

## 📦 Phase 2: Install Dependencies & Seed Content

### Step 1: Install New Dependencies

```bash
npm install
```

This installs:
- `tsx` - TypeScript execution for the seeding script
- `@sanity/client` - Sanity client for content creation

---

### Step 2: Get Your Sanity API Token

1. Go to: https://www.sanity.io/manage/personal/tokens
2. Click **"Add API token"**
3. Settings:
   - **Name:** `TYCHERA Content Seeding`
   - **Permissions:** **Editor** (or Admin)
4. Copy the token (you won't see it again!)

---

### Step 3: Add Token to .env.local

Open `.env.local` and add:

```bash
SANITY_API_TOKEN="sk_your_token_here"
```

Your `.env.local` should look like:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID="xiqaa9j2"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2026-02-05"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
SANITY_API_TOKEN="sk_your_token_here"
```

---

### Step 4: Run the Seeding Script

```bash
npm run seed
```

**Expected Output:**
```
🌱 Starting Sanity content seeding...

✅ Loaded translation files

✅ Created/Updated: Ingénierie Financière (01)
✅ Created/Updated: Financement de Projets (02)
✅ Created/Updated: Gestion de Fonds (03)
✅ Created/Updated: Structuration de Deals (04)

🎉 Content seeding complete!
📍 View your content at: https://www.sanity.io/manage
```

---

### Step 5: Verify Content in Sanity Studio

1. Start the dev server (if not running):
   ```bash
   npm run dev
   ```

2. Open Sanity Studio:
   ```
   http://localhost:3000/studio
   ```

3. Navigate to **"Service Item"** in the sidebar

4. You should see all 4 services:
   - 01. Ingénierie Financière
   - 02. Financement de Projets
   - 03. Gestion de Fonds
   - 04. Structuration de Deals

---

### Step 6: Test the Website

1. Visit the home page:
   ```
   http://localhost:3000
   ```

2. Test navigation:
   - Click **"Expertise"** → Should go to `/expertise` page
   - Click **"L'Institution"** → Should scroll to institution section
   - Click **"Contact"** → Should scroll to contact section
   - Toggle **FR/EN** → Should preserve current page

3. Visit expertise page:
   ```
   http://localhost:3000/expertise
   ```
   - Verify zig-zag layout
   - Check typography hierarchy
   - Test responsive design

---

## 🎯 Phase 3: Resume Implementation (Phase E)

Once seeding is complete and verified, we'll proceed with:

### Task 11.1: Contact Form with React Hook Form + Zod

**What we'll build:**
- Professional contact form with validation
- Server-side form handling
- Email integration (Resend or similar)
- Success/error states
- Loading indicators

**Files to work on:**
- `components/sections/ContactSection.tsx` (add form logic)
- `app/actions/contact.ts` (implement server action)
- `lib/validations/contact.ts` (verify Zod schema)

---

## 📋 Quick Troubleshooting

### Error: "Missing SANITY_API_TOKEN"
**Fix:** Add the token to `.env.local` (see Step 3)

### Error: "Permission denied"
**Fix:** Your token needs **Editor** or **Admin** permissions. Create a new token.

### Error: "Module not found: tsx"
**Fix:** Run `npm install` first

### Content not showing on website
**Fix:** 
1. Check Sanity Studio - are the documents published?
2. Restart dev server: `npm run dev`
3. Clear browser cache

---

## 📞 Ready to Continue?

Once you've completed the seeding and verified everything works, let me know and we'll proceed with **Phase E: Contact Form Implementation**.

**Command to run:**
```bash
npm run seed
```

That's it! 🚀

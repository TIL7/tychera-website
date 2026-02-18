# Quick Start - Testing Guide

## 🚀 Start the Development Server

```bash
npm run dev
```

Visit: `http://localhost:3000`

---

## ✅ What to Test

### 1. Header Navigation (Tone Fix)

**Check:**
- ❌ NO "Investir avec nous" button in header
- ✅ Only 3 nav links: Expertise, L'Institution, Contact
- ✅ Language toggle (FR/EN) works without losing page

**Test:**
- Click "Expertise" → Should go to `/expertise` page
- Click "L'Institution" → Should scroll to institution section
- Click "Contact" → Should scroll to contact form
- Toggle FR ↔ EN → Should stay on same page

---

### 2. Hero Section (Tone Fix)

**Check:**
- ✅ CTA button says "Découvrir notre expertise" (FR)
- ✅ CTA button says "Discover our expertise" (EN)

**Test:**
- Click CTA → Should scroll to services/pillars section

---

### 3. Contact Form (New Feature)

**Location:** Scroll to bottom of home page OR click "Contact" in header

**Test Validation:**

1. **Empty Form:**
   - Click "Envoyer ma demande" without filling anything
   - Should show red error messages under required fields

2. **Invalid Email:**
   - Enter "notanemail" in email field
   - Should show "Adresse email invalide"

3. **Short Message:**
   - Enter "Hello" in message field (< 20 chars)
   - Should show "Le message doit contenir au moins 20 caractères"

**Test Successful Submission:**

Fill out completely:
```
Name: Jean Dupont
Organization: ABC Corporation
Title: CFO
Email: jean.dupont@abc.com
Phone: +250 722 138 799
Country: Rwanda
Request Type: Financement de Projet
Message: Nous souhaitons discuter d'un projet d'infrastructure de grande envergure dans la région des Grands Lacs.
```

Click "Envoyer ma demande"

**Expected:**
- ⏳ Loading spinner appears
- ✅ Success screen shows (green checkmark)
- 🔔 Toast notification appears (top-right)
- 📝 Form resets
- 🔄 "Envoyer un autre message" button appears

**Check Console (F12):**
```
📧 Contact form submission: {
  name: "Jean Dupont",
  organization: "ABC Corporation",
  ...
}
```

---

### 4. Responsive Design

**Test on different screen sizes:**

**Mobile (< 768px):**
- Form fields stack vertically
- Contact info below form
- Mobile menu works (hamburger icon)

**Tablet (768px - 1024px):**
- Form fields in 2 columns
- Contact info on right side

**Desktop (> 1024px):**
- Form fields in 3 columns (Name, Org, Title)
- Full layout with map

---

### 5. Bilingual Support

**Test Language Toggle:**

1. Start in French (default)
2. Click "EN" in header
3. Verify:
   - Hero CTA: "Discover our expertise"
   - Form labels translate
   - Error messages translate
4. Click "FR" to switch back
5. Verify everything returns to French

---

## 🐛 Known Issues / TODO

### Content Seeding (Blocked)

**Issue:** Sanity API token lacks permissions

**Fix:**
1. Go to: https://www.sanity.io/manage/personal/tokens
2. Create token with **Editor** permissions
3. Add to `.env.local`: `SANITY_API_TOKEN="sk_..."`
4. Run: `npm run seed`

**Impact:** Website uses fallback data (hardcoded in components). Seeding will populate Sanity CMS for easier content management.

### Email Delivery (Phase F)

**Status:** Form works, but emails not sent yet

**Current:** Submissions logged to console only

**Next:** Integrate Zoho SMTP for actual email delivery

---

## 📊 Success Criteria

**✅ Phase E Complete When:**

- [ ] Header has no CTA button
- [ ] Hero CTA says "Découvrir notre expertise"
- [ ] Contact form validates correctly
- [ ] Contact form submits successfully
- [ ] Success message appears
- [ ] Form resets after submission
- [ ] Language toggle works (FR ↔ EN)
- [ ] Responsive on mobile/tablet/desktop
- [ ] No TypeScript errors
- [ ] No console errors (except seeding permission issue)

---

## 🆘 Troubleshooting

### Form Not Submitting

**Check:**
1. Console for errors (F12)
2. Network tab for failed requests
3. Ensure all required fields filled

### Validation Not Working

**Check:**
1. Zod schema in `lib/validations/contact.ts`
2. Form resolver in `ContactSection.tsx`
3. Console for validation errors

### Language Toggle Not Working

**Check:**
1. `usePathname` and `useRouter` from `@/i18n/navigation`
2. Middleware configuration
3. Console for routing errors

### Styling Issues

**Check:**
1. Tailwind classes applied correctly
2. Design system colors used
3. Browser cache (hard refresh: Ctrl+Shift+R)

---

## 📞 Ready for Phase F?

Once all tests pass, we're ready to proceed with:

**Phase F: Email Integration**
- Zoho SMTP setup
- Nodemailer configuration
- Email templates
- Delivery confirmation

**Command to proceed:**
```bash
# Ensure everything works first
npm run dev

# Then let me know you're ready for Phase F
```

---

## 🎯 Quick Commands

```bash
# Start dev server
npm run dev

# Run seeding (requires token)
npm run seed

# Build for production
npm run build

# Run tests
npm run test

# Lint code
npm run lint
```

---

**That's it! Test the form and let me know if you encounter any issues.** 🚀

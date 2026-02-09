# Content Seeding Guide

This guide explains how to automatically populate your Sanity CMS with content from the translation files.

## Prerequisites

1. **Sanity API Token**: You need a token with Editor or Admin permissions
   - Go to: https://www.sanity.io/manage/personal/tokens
   - Click "Add API token"
   - Name: `TYCHERA Content Seeding`
   - Permissions: **Editor** or **Admin**
   - Copy the token (you won't see it again!)

2. **Environment Variables**: Add the token to your `.env.local` file:
   ```bash
   SANITY_API_TOKEN="your-token-here"
   ```

## Running the Seeding Script

### Step 1: Install Dependencies

```bash
npm install
```

This will install `tsx` and `@sanity/client` needed for the seeding script.

### Step 2: Run the Seed Command

```bash
npm run seed
```

### Expected Output

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

## What Gets Created

The script creates 4 `serviceItem` documents in Sanity:

1. **Ingénierie Financière** (Financial Engineering)
   - Icon: Scale
   - Order: 1
   - Bilingual content (FR/EN)

2. **Financement de Projets** (Project Financing)
   - Icon: Construction
   - Order: 2
   - Bilingual content (FR/EN)

3. **Gestion de Fonds** (Fund Management)
   - Icon: TrendingUp
   - Order: 3
   - Bilingual content (FR/EN)

4. **Structuration de Deals** (Deal Structuring)
   - Icon: Handshake
   - Order: 4
   - Bilingual content (FR/EN)

## Verifying the Content

1. Go to your Sanity Studio: http://localhost:3000/studio
2. Navigate to "Service Item" in the sidebar
3. You should see all 4 services listed
4. Click on each to verify the content is correct

## Troubleshooting

### Error: Missing SANITY_API_TOKEN

**Solution**: Add the token to `.env.local`:
```bash
SANITY_API_TOKEN="skXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
```

### Error: Missing NEXT_PUBLIC_SANITY_PROJECT_ID

**Solution**: Ensure your `.env.local` has:
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID="xiqaa9j2"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2026-02-05"
```

### Error: Permission denied

**Solution**: Your API token needs Editor or Admin permissions. Create a new token with the correct permissions.

## Re-running the Script

The script uses `createOrReplace`, so you can run it multiple times safely. It will:
- Update existing documents if they exist
- Create new documents if they don't exist

This is useful if you update the translation files and want to sync the changes to Sanity.

## Manual Content Updates

After seeding, you can edit the content directly in Sanity Studio:
- Navigate to http://localhost:3000/studio
- Click on "Service Item"
- Edit any field
- Click "Publish"

The website will automatically reflect the changes (with ISR revalidation).

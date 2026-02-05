# TYCHERA Investments Website - Deployment Guide v1.0.0

## Overview
This document provides step-by-step instructions for deploying the TYCHERA Investments website to Vercel.

## Prerequisites
- GitHub account (client's account)
- Vercel account (already created under client's Gmail)
- Sanity CMS project credentials

## Required Environment Variables

The following environment variables must be configured in Vercel:

### Sanity CMS Configuration
```
NEXT_PUBLIC_SANITY_PROJECT_ID=<your-sanity-project-id>
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-02-05
```

### Site Configuration
```
NEXT_PUBLIC_SITE_URL=https://tycherainvestments.com
```

### Node Environment
```
NODE_ENV=production
```

## Deployment Steps

### Step 1: Push to GitHub

1. Initialize git repository (if not already done):
```bash
git init
git add .
git commit -m "Initial stable build v1.0.0 - Homepage and Studio functional"
```

2. Create a new private repository on GitHub:
   - Repository name: `tychera-invest-website`
   - Description: `TYCHERA Investment Services - Corporate Website`
   - Visibility: Private

3. Push to GitHub:
```bash
git remote add origin https://github.com/<username>/tychera-invest-website.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Log in to Vercel (https://vercel.com)

2. Click "Add New Project"

3. Import the GitHub repository:
   - Select `tychera-invest-website` from the list
   - Click "Import"

4. Configure the project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: ./
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

5. Add Environment Variables:
   - Click "Environment Variables"
   - Add each variable from the list above
   - Ensure all variables are set for Production, Preview, and Development

6. Click "Deploy"

### Step 3: Configure Custom Domain (Optional)

1. In Vercel project settings, go to "Domains"

2. Add custom domain: `tycherainvestments.com`

3. Follow Vercel's DNS configuration instructions

4. Update DNS records at Porkbun (domain registrar)

## Post-Deployment Verification

After deployment, verify the following:

- [ ] Homepage loads correctly at the Vercel URL
- [ ] All three expertise pillars are visible
- [ ] Sanity Studio is accessible at `/studio`
- [ ] Favicon displays TYCHERA branding
- [ ] French content displays correctly (default language)
- [ ] English language toggle works
- [ ] No console errors in browser

## Sanity Studio Access

The Sanity Studio is accessible at:
- Production: `https://your-domain.com/studio`
- Vercel Preview: `https://your-vercel-url.vercel.app/studio`

## Build Information

- **Version**: 1.0.0
- **Framework**: Next.js 15.1.6
- **Node Version**: 22.x (recommended)
- **Package Manager**: npm

## Troubleshooting

### Build Fails on Vercel

1. Check environment variables are set correctly
2. Verify Sanity project ID and dataset are valid
3. Check build logs for specific errors

### Sanity Content Not Loading

1. Verify `NEXT_PUBLIC_SANITY_PROJECT_ID` is correct
2. Ensure Sanity dataset is set to `production`
3. Check CORS settings in Sanity project settings

### 404 Errors

1. Verify all routes are properly configured
2. Check middleware.ts for locale routing
3. Ensure static files are in the `public` directory

## Support

For technical issues, contact the development team.
For content management, refer to `SANITY_CONTENT_GUIDE.md`.

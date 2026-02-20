# TYCHERA Investments LTD - Corporate Website

Official corporate website for TYCHERA Investments LTD, a sovereign financial firm specializing in project financing across Africa.

## About TYCHERA

TYCHERA Investments LTD is headquartered in Kigali, Rwanda, and serves as the bridge between international capital and African potential. We provide sophisticated financial structuring with sustainable impact.

## Technology Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4
- **CMS:** Sanity
- **Internationalization:** next-intl (French/English)
- **Form Validation:** React Hook Form + Zod
- **UI Components:** Radix UI + shadcn/ui

## Getting Started

### Prerequisites

- Node.js 18+ and npm installed
- Sanity account and project credentials

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SITE_URL=https://tycherainvestments.com
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Sanity Studio

Access the embedded Sanity Studio at [http://localhost:3000/studio](http://localhost:3000/studio) to manage content.

### Client CMS Portal

The Studio dashboard is intentionally limited to:
- Site Settings (singleton)
- Services
- Team Members

Client-editable content for this portal:
- Contact email and phone
- Address lines
- Social links (LinkedIn, X)
- Optional footer logo
- Optional legal/copyright text
- Services and team member documents

Seed the Site Settings singleton:

```bash
npm run seed:site-settings
```

Requirements:
- `SANITY_API_TOKEN` must be set to a valid write token
- The script upserts only `_id: "siteSettings"`

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalized routes
│   └── studio/            # Embedded Sanity Studio
├── components/
│   ├── sections/          # Page sections (Hero, Footer, etc.)
│   └── ui/                # Reusable UI components
├── lib/
│   └── sanity/            # Sanity client and queries
├── messages/              # i18n translation files
├── public/                # Static assets
└── sanity/                # Sanity schemas and config
```

## Localization

- **Default Language:** French (fr)
- **Secondary Language:** English (en)
- All content is managed through `messages/fr.json` and `messages/en.json`

## Deployment

```bash
npm run build
npm start
```

## Brand Guidelines

- **Primary Blue:** #2283a2
- **Accent Green:** #588157
- **Gold:** #E9C46A
- **Typography:** Playfair Display (headers), Inter (body)

## Contact

**TYCHERA INVESTMENTS LTD**  
Immeuble OHANA, Nyarutarama  
Kigali, Rwanda

Email: contact@tycherainvestments.com  
Phone: +250 722 138 799

---

© 2024 TYCHERA INVESTMENTS LTD. All rights reserved.

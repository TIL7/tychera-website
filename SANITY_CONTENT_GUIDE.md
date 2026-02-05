# Sanity Content Migration Guide

This guide will help you add content to Sanity Studio for the TYCHERA Investments website.

## Accessing Sanity Studio

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:3000/studio
   ```

3. You should see the Sanity Studio interface with three content types:
   - Service Item
   - Team Member
   - Page Content

## Task 7.4: Add Service Items (Four Pillars)

Add all four service pillars with the following information:

### Service Item 1: Ingénierie Financière

- **Number**: `01`
- **Title**:
  - French: `Ingénierie Financière`
  - English: `Financial Engineering`
- **Description**:
  - French: `Structuration sophistiquée de solutions financières sur mesure. Analyse rigoureuse, modélisation avancée et optimisation fiscale pour maximiser la valeur de vos projets d'investissement.`
  - English: `Sophisticated structuring of customized financial solutions. Rigorous analysis, advanced modeling, and tax optimization to maximize the value of your investment projects.`
- **Icon**: `Scale`
- **Order**: `1`
- **Detailed Content**: (Add rich text for expertise page - can be added later)

### Service Item 2: Financement de Projets

- **Number**: `02`
- **Title**:
  - French: `Financement de Projets`
  - English: `Project Financing`
- **Description**:
  - French: `Mobilisation de capital pour des projets d'infrastructure et de développement en Afrique. Partenariats stratégiques avec institutions financières internationales et investisseurs institutionnels.`
  - English: `Capital mobilization for infrastructure and development projects in Africa. Strategic partnerships with international financial institutions and institutional investors.`
- **Icon**: `Construction`
- **Order**: `2`
- **Detailed Content**: (Add rich text for expertise page - can be added later)

### Service Item 3: Gestion de Fonds

- **Number**: `03`
- **Title**:
  - French: `Gestion de Fonds`
  - English: `Fund Management`
- **Description**:
  - French: `Gestion professionnelle de portefeuilles d'investissement avec approche disciplinée. Diversification stratégique, gestion des risques et reporting transparent pour une croissance durable.`
  - English: `Professional management of investment portfolios with a disciplined approach. Strategic diversification, risk management, and transparent reporting for sustainable growth.`
- **Icon**: `TrendingUp`
- **Order**: `3`
- **Detailed Content**: (Add rich text for expertise page - can be added later)

### Service Item 4: Structuration de Deals

- **Number**: `04`
- **Title**:
  - French: `Structuration de Deals`
  - English: `Deal Structuring`
- **Description**:
  - French: `Conception et négociation de transactions complexes. Due diligence approfondie, structuration juridique et financière, et coordination des parties prenantes pour des partenariats réussis.`
  - English: `Design and negotiation of complex transactions. Thorough due diligence, legal and financial structuring, and stakeholder coordination for successful partnerships.`
- **Icon**: `Handshake`
- **Order**: `4`
- **Detailed Content**: (Add rich text for expertise page - can be added later)

## Steps to Add Content in Sanity Studio

1. Click on "Service Item" in the left sidebar
2. Click the "+ Create" button
3. Fill in all the fields:
   - Number (e.g., "01")
   - Title (both French and English)
   - Description (both French and English)
   - Icon (Lucide icon name)
   - Order (1-4)
4. Click "Publish" to save
5. Repeat for all four service items

## Verification

After adding all four service items, you should see them listed in the Studio with:
- Correct numbering (01-04)
- French titles displayed
- Order numbers (1-4)

## Next Steps

Once you've added the service items:
1. Confirm that all four items are published
2. Let me know, and I'll continue with tasks 7.5-7.7 to integrate this content into the website components

## Optional: Add Page Content

You can also add page content blocks for dynamic text:

### Example: Hero Title

- **Key**: `hero-title`
- **Content**:
  - French: `Architecte du Financement des Projets en Afrique`
  - English: `Architect of Project Financing in Africa`
- **Page**: `home`
- **Description**: `Main hero section title`

### Example: Hero Subtitle

- **Key**: `hero-subtitle`
- **Content**:
  - French: `Le pont entre capital international et potentiel africain. Structuration sophistiquée, impact durable.`
  - English: `The bridge between international capital and African potential. Sophisticated structuring, sustainable impact.`
- **Page**: `home`
- **Description**: `Hero section subtitle`

## Troubleshooting

If you encounter any issues:
- Make sure the development server is running (`npm run dev`)
- Check that you're logged in to Sanity (you should see your email in the top right)
- Verify that all required fields are filled in before publishing
- Check the browser console for any error messages

## Important Notes

- **French is Primary**: Always fill in French content first, as it's the source of truth
- **Institutional Tone**: Use formal, professional language (avoid casual terms)
- **Forbidden Words**: Do not use: "rocketship", "unleash", "disrupt", "awesome", "cool", "amazing", "limited time", "act now"
- **Preferred Terms**: Use: "partenariat stratégique", "excellence institutionnelle", "croissance durable"

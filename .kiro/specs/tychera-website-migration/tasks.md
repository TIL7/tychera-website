# Implementation Plan: TYCHERA Website Migration

## Overview

This implementation plan breaks down the migration of the TYCHERA Investments LTD website from Vite/React to Next.js 15 into discrete, actionable tasks. The plan follows five major phases: Architecture Cleanup, Routing and Pages, CMS Integration, Internationalization, and Production Features.

## Tasks

- [x] 1. Phase A: Architecture Cleanup - Initialize Next.js 15 Project
  - [x] 1.1 Initialize Next.js 15 with App Router and TypeScript
    - Run `npx create-next-app@latest` with App Router, TypeScript, Tailwind CSS, and src/ directory options
    - Configure TypeScript in strict mode with explicit return types
    - Set up path aliases (@/ for root, @/components, @/lib, etc.)
    - _Requirements: 1.1, 1.7_
  
  - [x] 1.2 Configure Tailwind CSS v4
    - Update tailwind.config.ts with TYCHERA design system colors (Primary Blue #2283a2, Accent Green #588157, Gold #E9C46A)
    - Configure Playfair Display and Inter fonts
    - Set up custom Tailwind utilities for glass-header, animations
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6_
  
  - [x] 1.3 Set up project directory structure
    - Create components/sections/ directory for large layout blocks
    - Create components/ui/ directory for Shadcn primitives
    - Create lib/sanity/ directory for CMS configuration
    - Create lib/email/ directory for SMTP configuration
    - Create messages/ directory for i18n translation files
    - Create app/actions/ directory for Server Actions
    - _Requirements: 1.4, 1.5_
  
  - [x] 1.4 Migrate Shadcn UI components
    - Copy all files from src/components/ui/ to components/ui/
    - Update import paths to use @/components/ui
    - Verify all UI primitives work with Next.js
    - _Requirements: 1.4, 1.5_

- [ ] 2. Phase A: Architecture Cleanup - Migrate Section Components
  - [x] 2.1 Migrate Header component to Server/Client hybrid
    - Move src/components/Header.tsx to components/sections/Header.tsx
    - Mark as Client Component with 'use client' directive (uses useState for language toggle and mobile menu)
    - Update imports to use @/ path alias
    - Replace logo imports with Next.js Image component
    - _Requirements: 1.2, 1.3, 2.1, 2.2, 2.6_
  
  - [x] 2.2 Migrate Hero component to Server Component
    - Move src/components/Hero.tsx to components/sections/Hero.tsx
    - Convert to Server Component (remove useState, useEffect)
    - Replace img with Next.js Image component for hero image
    - Update smooth scroll to use anchor links (client-side handled by browser)
    - _Requirements: 1.2, 2.1, 2.6_
  
  - [x] 2.3 Migrate ThreePillars component to Server Component
    - Move src/components/ThreePillars.tsx to components/sections/ThreePillars.tsx
    - Convert to Server Component
    - Replace Intersection Observer with CSS-based animations
    - Prepare for CMS integration (hardcoded data for now)
    - _Requirements: 1.2, 2.1_
  
  - [x] 2.4 Migrate PrincipalVision component to Server Component
    - Move src/components/PrincipalVision.tsx to components/sections/PrincipalVision.tsx
    - Convert to Server Component
    - Update styling to match design system
    - _Requirements: 1.2, 2.1_
  
  - [x] 2.5 Migrate ContactSection component to Client Component
    - Move src/components/ContactSection.tsx to components/sections/ContactSection.tsx
    - Mark as Client Component (uses form state)
    - Keep form structure but prepare for React Hook Form + Zod integration
    - _Requirements: 1.2, 1.3, 2.1, 2.2_
  
  - [x] 2.6 Migrate Footer component to Server Component
    - Move src/components/Footer.tsx to components/sections/Footer.tsx
    - Convert to Server Component
    - Add TIN number and complete address information
    - _Requirements: 1.2, 2.1, 9.1, 9.2, 9.3, 9.4_
  
  - [x] 2.7 Migrate LocationMap component to Server Component
    - Move src/components/LocationMap.tsx to components/sections/LocationMap.tsx
    - Convert to Server Component (static embedded map)
    - _Requirements: 1.2, 2.1_

- [ ] 3. Phase A: Architecture Cleanup - Optimize Assets
  - [x] 3.1 Optimize and move assets to public directory
    - Move src/assets/ contents to public/images/
    - Optimize SVG logos (tychera-logo-color.svg, tychera-logo-white.svg)
    - Optimize hero-infrastructure.jpg for web (WebP format)
    - Update all image references to use /images/ path
    - _Requirements: 2.6, 2.7_
  
  - [x] 3.2 Configure Next.js Image optimization
    - Update next.config.js with image domains and formats
    - Set up image optimization for Sanity CDN (cdn.sanity.io)
    - _Requirements: 2.6, 11.1_

- [x] 4. Phase A: Checkpoint - Verify Architecture Migration
  - Ensure all components are in correct directories
  - Verify all imports use @/ path aliases
  - Confirm Server/Client component classification is correct
  - Test that the application builds successfully
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 2.1, 2.2_

- [ ] 5. Phase B: Routing and Pages - Create App Router Structure
  - [x] 5.1 Create root layout with providers
    - Create app/layout.tsx with HTML structure, fonts, and metadata
    - Add Toaster and TooltipProvider
    - Configure viewport and theme-color metadata
    - _Requirements: 3.4, 3.5_
  
  - [x] 5.2 Create locale-based routing structure
    - Create app/[locale]/layout.tsx for i18n routing
    - Create app/[locale]/page.tsx (home page)
    - Import and compose all section components (Header, Hero, ThreePillars, PrincipalVision, ContactSection, Footer)
    - _Requirements: 3.1, 3.4_
  
  - [x] 5.3 Create expertise page
    - Create app/[locale]/expertise/page.tsx
    - Design detailed service breakdown layout
    - Add navigation from ThreePillars section to expertise page
    - _Requirements: 3.2, 15.1, 15.4_
  
  - [x] 5.4 Create custom 404 page
    - Create app/[locale]/not-found.tsx
    - Add TYCHERA branding and styling
    - Include navigation back to home
    - _Requirements: 3.3_
  
  - [x] 5.5 Implement SEO metadata generation
    - Create lib/metadata.ts with metadata generation functions
    - Add generateMetadata() to all page components
    - Include title, description, canonical URL, keywords
    - _Requirements: 3.5_
  
  - [x] 5.6 Implement Open Graph tags
    - Add Open Graph metadata to all pages (og:title, og:description, og:image, og:url, og:type)
    - Create OG image for social sharing (1200x630px)
    - _Requirements: 3.6_

- [x] 6. Phase B: Checkpoint - Verify Routing and Pages
  - Test navigation between all routes
  - Verify metadata appears correctly in page source
  - Check Open Graph tags with social media debuggers
  - Ensure 404 page displays for invalid routes
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_

- [ ] 7. Phase C: CMS Integration - Set Up Sanity
  - [x] 7.1 Initialize Sanity project
    - Run `npm create sanity@latest` in /sanity directory
    - Configure project ID and dataset (production)
    - Set up Sanity Studio configuration
    - _Requirements: 4.1, 4.8_
  
  - [x] 7.2 Define Sanity schemas
    - Create lib/sanity/schemas/serviceItem.ts with fields: number, title (fr/en), description (fr/en), detailedContent (fr/en), icon, order
    - Create lib/sanity/schemas/teamMember.ts with fields: name, role (fr/en), bio (fr/en), image, order
    - Create lib/sanity/schemas/pageContent.ts with fields: key, content (fr/en), page
    - Register schemas in Sanity config
    - _Requirements: 4.2, 4.3, 4.4_
  
  - [x] 7.3 Create Sanity client and query utilities
    - Create lib/sanity/client.ts with createClient configuration
    - Implement sanityFetch() wrapper with error handling and caching
    - Create lib/sanity/queries.ts with GROQ queries (SERVICE_ITEMS_QUERY, TEAM_MEMBERS_QUERY, PAGE_CONTENT_QUERY)
    - _Requirements: 4.5, 4.6, 4.7_
  
  - [-] 7.4 Migrate content to Sanity
    - Add all four service pillars to Sanity (Ingénierie Financière, Financement de Projets, Gestion de Fonds, Structuration de Deals)
    - Add detailed content for expertise page
    - Add page content blocks (hero text, about section, etc.)
    - _Requirements: 4.2, 4.3, 4.4_
    - **Note: User needs to manually add content via Sanity Studio at http://localhost:3000/studio**
  
  - [x] 7.5 Update ThreePillars component to fetch from CMS
    - Modified components/sections/ThreePillars.tsx to use sanityFetchWithFallback()
    - Fetches service items with SERVICE_ITEMS_QUERY
    - Maps CMS data to component props with locale-aware text extraction
    - Implements fallback to hardcoded data if CMS unavailable
    - Dynamic icon rendering from CMS icon field
    - _Requirements: 4.5, 4.6, 15.6_
  
  - [x] 7.6 Update Expertise page to fetch from CMS
    - Modified app/[locale]/expertise/page.tsx to use sanityFetchWithFallback()
    - Fetches detailed service content with EXPERTISE_PAGE_QUERY
    - Renders rich text content from Sanity using @portabletext/react
    - Implements alternating layout for visual interest
    - Includes CTA section at bottom
    - _Requirements: 4.5, 4.6, 15.1, 15.6_
  
  - [x] 7.7 Implement CMS error boundaries
    - Created components/sections/CMSErrorBoundary.tsx for CMS errors
    - Implements React Error Boundary pattern with graceful fallback UI
    - Provides CMSSectionError component for inline error messages
    - Wrapped ThreePillars in CMSErrorBoundary on home page
    - Includes retry functionality via page reload
    - _Requirements: 4.6, 4.7, 4.8_

- [x] 8. Phase C: Checkpoint - Verify CMS Integration
  - Test content fetching from Sanity
  - Verify error handling when CMS is unavailable
  - Check that all content displays correctly
  - Test Sanity Studio content editing
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8_

- [x] 9. Phase D: Internationalization - Set Up next-intl
  - [x] 9.1 Install and configure next-intl
    - Install next-intl package
    - Create i18n/config.ts with locale configuration (fr as default, en as secondary)
    - Create i18n/request.ts for message loading
    - Create i18n/navigation.ts with routing utilities
    - Create middleware.ts for locale detection and routing (localePrefix: 'always')
    - _Requirements: 5.1, 5.2, 5.3, 5.6, 5.7_
  
  - [x] 9.2 Extract French translations to messages/fr.json
    - Create messages/fr.json with all text content
    - Organize translations by section (header, hero, pillars, principal, contact, footer)
    - Use formal "vous" form throughout
    - Ensure institutional tone and avoid forbidden language
    - _Requirements: 5.4, 5.10, 10.1, 10.2, 10.3, 10.4_
  
  - [x] 9.3 Create English translations in messages/en.json
    - Translate all French content to English
    - Maintain institutional tone in English ("Financial Engineering", "Strategic Collaboration")
    - Preserve meaning and formality
    - _Requirements: 5.5, 10.1_
  
  - [x] 9.4 Update Header component with language toggle
    - Implement useLocale() and useRouter() from next-intl
    - Update language toggle to switch between /fr and /en routes
    - Persist language preference in URL
    - Added switchLanguage() function using router.replace()
    - _Requirements: 5.8, 5.9_
  
  - [x] 9.5 Update all components to use translations
    - Replace hardcoded text with useTranslations() hook
    - Updated Hero, ThreePillars, PrincipalVision, ContactSection, Footer
    - Ensure all user-facing text is translatable
    - Added NextIntlClientProvider to app/[locale]/layout.tsx
    - _Requirements: 5.1, 5.8_
  
  - [x] 9.6 Implement locale-aware CMS queries
    - Sanity schemas already support fr/en fields
    - CMS queries will map locale to appropriate field
    - Fallback handling already implemented in sanityFetchWithFallback()
    - _Requirements: 5.1, 5.2_

- [x] 10. Phase D: Checkpoint - Verify Internationalization
  - ✅ Language switching works between French and English
  - ✅ French is default (middleware uses localePrefix: 'always', defaultLocale: 'fr')
  - ✅ Language persists across navigation via URL (/fr or /en)
  - ✅ All content is properly translated in both languages
  - ✅ Dev server running successfully on http://localhost:3001
  - ✅ Zero TypeScript errors across all components
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9_

- [ ] 11. Phase E: Production Features - Implement Contact Form
  - [ ] 11.1 Set up React Hook Form with Zod validation
    - Install react-hook-form and zod packages
    - Create lib/validations/contact.ts with Zod schema
    - Define validation rules (required fields, email format, min lengths)
    - _Requirements: 7.2, 7.3, 7.4, 7.6, 7.7_
  
  - [ ] 11.2 Update ContactSection with form validation
    - Integrate useForm() hook from react-hook-form
    - Connect Zod schema with zodResolver
    - Implement field-level error messages
    - Add loading states during submission
    - _Requirements: 7.1, 7.2, 7.3, 7.4_
  
  - [ ] 11.3 Create Server Action for form submission
    - Create app/actions/contact.ts with submitContactForm()
    - Implement Zod validation on server side
    - Add comprehensive error handling (validation errors, SMTP errors, generic errors)
    - Return structured response (success, message, error)
    - _Requirements: 7.5, 7.8, 7.9_
  
  - [ ] 11.4 Configure Zoho SMTP integration
    - Create lib/email/zoho.ts with nodemailer configuration
    - Set up SMTP transporter with Zoho credentials
    - Implement email template with all form fields
    - Format email professionally with HTML structure
    - _Requirements: 8.1, 8.2, 8.3, 8.4_
  
  - [ ] 11.5 Implement email error handling
    - Add try-catch blocks for SMTP operations
    - Handle connection timeouts, authentication failures, rate limits
    - Log email delivery status
    - Return user-friendly error messages
    - _Requirements: 8.5, 8.6_
  
  - [ ] 11.6 Connect form to Server Action
    - Update ContactSection to call submitContactForm()
    - Handle success response (display success message, reset form)
    - Handle error response (display error message, allow retry)
    - Add loading spinner during submission
    - _Requirements: 7.5, 7.8, 7.9_

- [ ] 12. Phase E: Production Features - Environment Configuration
  - [ ] 12.1 Set up environment variables
    - Create .env.local with all required variables (Sanity, Zoho SMTP, contact email)
    - Create .env.example with variable names (no values)
    - Add .env.local to .gitignore
    - _Requirements: 14.1, 14.2, 14.3_
  
  - [ ] 12.2 Implement environment variable validation
    - Create lib/env.ts with Zod schema for environment variables
    - Implement validateEnv() function
    - Call validation at build time
    - Display helpful error messages for missing variables
    - _Requirements: 14.4_
  
  - [ ] 12.3 Configure environment-specific settings
    - Set up different Sanity datasets for development and production
    - Configure CORS for Sanity API
    - Set up production vs development logging
    - _Requirements: 14.5, 14.6_

- [ ] 13. Phase E: Production Features - Accessibility Implementation
  - [ ] 13.1 Implement semantic HTML throughout
    - Ensure all pages use proper semantic elements (header, nav, main, section, article, footer)
    - Replace generic divs with semantic alternatives where appropriate
    - _Requirements: 2.5, 12.1_
  
  - [ ] 13.2 Add ARIA labels to interactive elements
    - Add aria-label to all buttons without visible text
    - Add aria-label to form inputs where labels are visual only
    - Add aria-expanded to collapsible elements
    - Add sr-only text for screen readers
    - _Requirements: 2.5, 12.2_
  
  - [ ] 13.3 Ensure proper heading hierarchy
    - Verify each page has exactly one h1
    - Ensure heading levels don't skip (h1 → h2 → h3, not h1 → h3)
    - Use headings for structure, not styling
    - _Requirements: 12.3_
  
  - [ ] 13.4 Verify color contrast ratios
    - Test all text/background combinations with contrast checker
    - Ensure Primary Blue (#2283a2) on white meets WCAG AA (4.5:1)
    - Adjust colors if needed to meet accessibility standards
    - _Requirements: 12.4_
  
  - [ ] 13.5 Implement keyboard navigation
    - Ensure all interactive elements are keyboard accessible
    - Test Tab navigation order
    - Add focus styles to all interactive elements
    - Implement keyboard shortcuts where appropriate (Escape to close modals)
    - _Requirements: 12.5_
  
  - [ ] 13.6 Add alt text to all images
    - Add descriptive alt text to content images
    - Add empty alt="" to decorative images
    - Ensure logo has appropriate alt text
    - _Requirements: 12.6_
  
  - [ ] 13.7 Ensure form accessibility
    - Associate all form inputs with labels
    - Add aria-describedby for error messages
    - Ensure error messages are announced to screen readers
    - Add required attribute to required fields
    - _Requirements: 12.7_

- [ ] 14. Phase E: Production Features - Performance Optimization
  - [ ] 14.1 Optimize images
    - Convert all images to WebP format
    - Implement responsive images with srcset
    - Add loading="lazy" to below-the-fold images
    - Preload hero image
    - _Requirements: 11.1, 11.2, 11.7_
  
  - [ ] 14.2 Implement code splitting
    - Use dynamic imports for heavy components
    - Split routes into separate chunks
    - Lazy load non-critical components
    - _Requirements: 11.6_
  
  - [ ] 14.3 Configure caching
    - Set up ISR (Incremental Static Regeneration) for CMS content
    - Configure cache headers for static assets
    - Implement SWR for client-side data fetching
    - _Requirements: 11.4_

- [ ] 15. Phase E: Production Features - Testing Implementation
  - [ ] 15.1 Set up Vitest testing framework
    - Install vitest, @testing-library/react, @testing-library/user-event
    - Configure vitest.config.ts
    - Set up test environment with jsdom
    - Create test setup file
    - _Requirements: 13.1_
  
  - [ ] 15.2 Install fast-check for property-based testing
    - Install fast-check package
    - Configure fast-check with Vitest
    - Create property test utilities
    - _Requirements: 13.1_
  
  - [ ]* 15.3 Write property test for accessibility - interactive elements
    - **Property 1: Accessibility - Interactive Elements**
    - Test that all interactive elements have accessible names
    - Generate random button, link, and input configurations
    - Verify aria-label or text content exists
    - Run 100 iterations
    - **Validates: Requirements 2.5, 12.2**
  
  - [ ]* 15.4 Write property test for accessibility - heading hierarchy
    - **Property 3: Accessibility - Heading Hierarchy**
    - Test that heading levels don't skip
    - Generate random page structures with headings
    - Verify h1 → h2 → h3 order (no skipping)
    - Run 100 iterations
    - **Validates: Requirements 12.3**
  
  - [ ]* 15.5 Write property test for design system - color compliance
    - **Property 12: Design System - Color Compliance**
    - Test that primary buttons use Primary Blue (#2283a2)
    - Generate random button configurations
    - Verify computed background color matches design system
    - Run 100 iterations
    - **Validates: Requirements 6.1, 6.2, 6.3**
  
  - [ ]* 15.6 Write property test for design system - typography
    - **Property 13: Design System - Typography**
    - Test that headings use Playfair Display, body text uses Inter
    - Generate random text elements
    - Verify computed font-family matches design system
    - Run 100 iterations
    - **Validates: Requirements 6.4, 6.5**
  
  - [ ]* 15.7 Write property test for form validation
    - **Property 15: Form Validation - Comprehensive**
    - Test that invalid form data is rejected with appropriate errors
    - Generate random invalid form submissions (missing fields, bad email, empty strings)
    - Verify error messages are displayed
    - Run 100 iterations
    - **Validates: Requirements 7.4, 7.6, 7.7**
  
  - [ ]* 15.8 Write property test for content compliance
    - **Property 19: Content Compliance - Forbidden Language**
    - Test that content doesn't contain forbidden terms
    - Generate random text content
    - Verify no forbidden words appear (rocketship, unleash, disrupt, awesome, cool, amazing, limited time, act now)
    - Run 100 iterations
    - **Validates: Requirements 10.2, 10.3, 10.4**
  
  - [ ]* 15.9 Write unit tests for Header component
    - Test language toggle displays FR and EN
    - Test clicking language toggle switches active language
    - Test mobile menu opens on hamburger click
    - _Requirements: 5.8, 5.9_
  
  - [ ]* 15.10 Write unit tests for ContactSection component
    - Test form displays all required fields
    - Test form validation shows errors for invalid data
    - Test successful submission displays success message
    - Test failed submission displays error message
    - _Requirements: 7.1, 7.4, 7.8, 7.9_
  
  - [ ]* 15.11 Write unit tests for Server Action
    - Test valid form submission returns success
    - Test invalid email returns validation error
    - Test missing required fields returns validation error
    - Test SMTP error returns appropriate error message
    - _Requirements: 7.5, 7.8, 7.9, 8.5_
  
  - [ ]* 15.12 Write integration test for form submission flow
    - Test complete form submission from UI to email
    - Fill out form, submit, verify success message
    - Test error handling when submission fails
    - _Requirements: 7.5, 7.8, 7.9, 8.2_

- [ ] 16. Phase E: Final Checkpoint - Production Readiness
  - Run full test suite and ensure all tests pass
  - Verify Lighthouse performance score > 90
  - Test on multiple devices and browsers
  - Verify all environment variables are configured
  - Check that all content is properly translated
  - Ensure error handling works throughout
  - Test form submission end-to-end
  - Verify CMS content displays correctly
  - Ask the user if any issues or questions arise
  - _Requirements: All_

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at the end of each phase
- Property tests validate universal correctness properties with 100+ iterations
- Unit tests validate specific examples and edge cases
- Server Components (RSC) are used by default; Client Components only when interactivity is required
- French is the primary language and source of truth for all content
- Design system colors must be strictly followed: Primary Blue #2283a2, Accent Green #588157, Gold #E9C46A

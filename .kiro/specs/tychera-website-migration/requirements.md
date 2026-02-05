# Requirements Document: TYCHERA Website Migration

## Introduction

This document specifies the requirements for migrating the TYCHERA Investments LTD website from a Vite/React prototype to a production-ready Next.js 15 application. The migration encompasses architectural modernization, CMS integration, internationalization, and production-readiness features while maintaining the institutional brand identity of a sovereign financial firm.

## Glossary

- **System**: The TYCHERA Investments LTD website application
- **App_Router**: Next.js 15 App Router architecture
- **RSC**: React Server Components
- **CMS**: Sanity Content Management System
- **i18n_System**: next-intl internationalization system
- **Primary_Locale**: French language (fr) as the default and source of truth
- **Secondary_Locale**: English language (en) as translated content
- **Server_Action**: Next.js server-side form handler
- **GROQ**: Graph-Relational Object Queries for Sanity CMS
- **Design_System**: Color palette, typography, and styling standards
- **Trust_Layer**: Legal information, contact details, and credibility indicators

## Requirements

### Requirement 1: Next.js Architecture Migration

**User Story:** As a developer, I want to migrate from Vite/React to Next.js 15 App Router, so that the application uses modern React patterns and server-side rendering capabilities.

#### Acceptance Criteria

1. THE System SHALL use Next.js 15 with App Router architecture
2. THE System SHALL implement React Server Components as the default component pattern
3. WHEN a component requires client-side interactivity, THE System SHALL use the 'use client' directive
4. THE System SHALL organize components into /components/sections for large layout blocks
5. THE System SHALL organize UI primitives into /components/ui directory
6. THE System SHALL remove all Vite-specific configuration and dependencies
7. THE System SHALL configure TypeScript in strict mode with explicit return types

### Requirement 2: Component Architecture

**User Story:** As a developer, I want to properly structure components following Next.js patterns, so that the codebase is maintainable and follows best practices.

#### Acceptance Criteria

1. THE System SHALL convert existing components to Server Components by default
2. WHEN a component uses useState, useEffect, or event handlers, THE System SHALL mark it with 'use client'
3. THE System SHALL implement proper component composition patterns
4. THE System SHALL define TypeScript interfaces for all component props
5. THE System SHALL implement semantic HTML with proper ARIA labels
6. THE System SHALL optimize all images using Next.js Image component
7. THE System SHALL optimize SVG logos for performance

### Requirement 3: Routing and Pages

**User Story:** As a user, I want to navigate between different pages of the website, so that I can access all information about TYCHERA's services.

#### Acceptance Criteria

1. THE System SHALL implement a home page at the root route
2. THE System SHALL implement an /expertise route with detailed service breakdowns
3. THE System SHALL implement a custom 404 page with TYCHERA branding
4. THE System SHALL use Next.js file-based routing conventions
5. THE System SHALL implement proper metadata for SEO on all pages
6. THE System SHALL implement Open Graph tags for social sharing

### Requirement 4: Sanity CMS Integration

**User Story:** As a content manager, I want to manage website content through Sanity CMS, so that I can update content without code changes.

#### Acceptance Criteria

1. THE System SHALL integrate Sanity CMS in the /sanity directory
2. THE System SHALL define a teamMember schema with fields for name, role, bio, and image
3. THE System SHALL define a serviceItem schema with fields for title, description, icon, and order
4. THE System SHALL define a pageContent schema for managing text blocks
5. WHEN fetching content, THE System SHALL use GROQ queries
6. THE System SHALL implement proper error handling for CMS data fetching
7. THE System SHALL implement caching strategies for CMS content
8. THE System SHALL configure Sanity Studio for content editing

### Requirement 5: Internationalization (i18n)

**User Story:** As a user, I want to view the website in French or English, so that I can read content in my preferred language.

#### Acceptance Criteria

1. THE System SHALL use next-intl for internationalization
2. THE System SHALL implement French as the Primary_Locale and default language
3. THE System SHALL implement English as the Secondary_Locale
4. THE System SHALL store French translations in /messages/fr.json
5. THE System SHALL store English translations in /messages/en.json
6. THE System SHALL implement /[locale] routing strategy
7. WHEN no locale is specified, THE System SHALL default to French
8. THE System SHALL provide a language toggle in the header
9. THE System SHALL persist language preference across navigation
10. THE System SHALL use formal "vous" form in all French content

### Requirement 6: Design System Implementation

**User Story:** As a designer, I want the website to follow the TYCHERA design system, so that the brand identity is consistent throughout.

#### Acceptance Criteria

1. THE System SHALL use Primary Blue (#2283a2) for trust elements and primary buttons
2. THE System SHALL use Accent Green (#588157) for sustainability and growth indicators
3. THE System SHALL use Gold (#E9C46A) for borders, dividers, and accent elements
4. THE System SHALL use Playfair Display font for all headers
5. THE System SHALL use Inter font for all body text
6. THE System SHALL use Tailwind CSS v4 for all styling
7. THE System SHALL implement responsive design for mobile, tablet, and desktop
8. THE System SHALL maintain consistent spacing using Tailwind spacing scale

### Requirement 7: Contact Form Implementation

**User Story:** As a potential client, I want to submit a contact form, so that I can inquire about TYCHERA's services.

#### Acceptance Criteria

1. THE System SHALL implement a contact form with fields for name, email, phone, and message
2. THE System SHALL use React Hook Form for form state management
3. THE System SHALL use Zod for form validation
4. WHEN a user submits invalid data, THE System SHALL display field-specific error messages
5. WHEN a user submits valid data, THE System SHALL process the form via Server_Action
6. THE System SHALL validate email format before submission
7. THE System SHALL validate required fields before submission
8. WHEN form submission succeeds, THE System SHALL display a success message
9. WHEN form submission fails, THE System SHALL display an error message with retry option

### Requirement 8: Email Integration

**User Story:** As a business owner, I want contact form submissions to be sent via email, so that I can respond to inquiries promptly.

#### Acceptance Criteria

1. THE System SHALL integrate with Zoho SMTP for email delivery
2. WHEN a contact form is submitted, THE System SHALL send an email to the configured recipient
3. THE System SHALL include all form fields in the email body
4. THE System SHALL format emails professionally with proper structure
5. THE System SHALL handle SMTP errors gracefully
6. THE System SHALL log email delivery status
7. THE System SHALL store SMTP credentials securely in environment variables

### Requirement 9: Trust Layer and Legal Information

**User Story:** As a potential client, I want to see legal and contact information, so that I can verify TYCHERA's legitimacy and location.

#### Acceptance Criteria

1. THE System SHALL display the TIN (Tax Identification Number) in the footer
2. THE System SHALL display the physical address in Kigali, Rwanda in the footer
3. THE System SHALL display contact phone numbers in the footer
4. THE System SHALL display contact email addresses in the footer
5. THE System SHALL implement trust indicators throughout the site
6. THE System SHALL display professional credentials where appropriate

### Requirement 10: Content and Brand Voice

**User Story:** As a content writer, I want content guidelines enforced, so that all text maintains TYCHERA's institutional voice.

#### Acceptance Criteria

1. THE System SHALL use institutional and sophisticated language throughout
2. THE System SHALL avoid startup jargon including "rocketship", "unleash", "disrupt", "game-changer"
3. THE System SHALL avoid casual language including "awesome", "cool", "amazing"
4. THE System SHALL avoid aggressive sales language including "limited time", "act now", "don't miss out"
5. THE System SHALL use preferred terms including "partenariat stratégique", "excellence institutionnelle", "croissance durable"
6. THE System SHALL maintain formal tone appropriate for high-net-worth clients
7. THE System SHALL use measured language without hyperbole

### Requirement 11: Performance Optimization

**User Story:** As a user, I want the website to load quickly, so that I can access information without delays.

#### Acceptance Criteria

1. THE System SHALL optimize all images using Next.js Image component
2. THE System SHALL implement lazy loading for below-the-fold content
3. THE System SHALL minimize JavaScript bundle size
4. THE System SHALL implement proper caching headers
5. THE System SHALL achieve a Lighthouse performance score above 90
6. THE System SHALL implement code splitting for route-based chunks
7. THE System SHALL preload critical assets

### Requirement 12: Accessibility Compliance

**User Story:** As a user with disabilities, I want the website to be accessible, so that I can navigate and use all features.

#### Acceptance Criteria

1. THE System SHALL use semantic HTML elements throughout
2. THE System SHALL provide ARIA labels for all interactive elements
3. THE System SHALL maintain proper heading hierarchy (h1, h2, h3)
4. THE System SHALL ensure sufficient color contrast ratios (WCAG AA)
5. THE System SHALL support keyboard navigation for all interactive elements
6. THE System SHALL provide alt text for all images
7. THE System SHALL ensure form inputs have associated labels

### Requirement 13: Testing Infrastructure

**User Story:** As a developer, I want automated tests, so that I can verify functionality and prevent regressions.

#### Acceptance Criteria

1. THE System SHALL use Vitest as the testing framework
2. THE System SHALL implement unit tests for utility functions
3. THE System SHALL implement component tests for UI components
4. THE System SHALL implement integration tests for form submission
5. THE System SHALL achieve minimum 80% code coverage for critical paths
6. THE System SHALL run tests in CI/CD pipeline

### Requirement 14: Environment Configuration

**User Story:** As a developer, I want proper environment configuration, so that the application works across development, staging, and production environments.

#### Acceptance Criteria

1. THE System SHALL use environment variables for all configuration
2. THE System SHALL store sensitive credentials in .env.local (not committed)
3. THE System SHALL provide .env.example with required variable names
4. THE System SHALL validate required environment variables at build time
5. THE System SHALL use different Sanity datasets for development and production
6. THE System SHALL configure CORS appropriately for each environment

### Requirement 15: Expertise Page Content

**User Story:** As a potential client, I want to read detailed information about TYCHERA's four service pillars, so that I can understand their expertise areas.

#### Acceptance Criteria

1. THE System SHALL display detailed content for each of the four service pillars
2. THE System SHALL organize expertise content in a clear, scannable format
3. THE System SHALL include relevant icons or imagery for each pillar
4. THE System SHALL link from the home page ThreePillars section to the expertise page
5. THE System SHALL maintain consistent styling with the rest of the site
6. THE System SHALL source expertise content from Sanity CMS

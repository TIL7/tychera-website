---
inclusion: always
---
---
inclusion: always
---

# TYCHERA Investments LTD - Engineering Standards

You are the Lead Principal Engineer for TYCHERA Investments LTD, a sovereign financial firm based in Kigali, Rwanda.

## Core Technology Stack

**Framework & Libraries:**
- Next.js 15 (App Router) - Use Server Components (RSC) by default
- Tailwind CSS v4 - For all styling
- Sanity CMS - Content management
- next-intl - Internationalization (i18n)
- React Hook Form + Zod - Form validation

## Design System

**Color Palette:**
- **Primary Blue:** `#2283a2` - Trust, professionalism, primary buttons
- **Accent Green:** `#588157` - Sustainability, growth indicators
- **Gold:** `#E9C46A` - Borders, dividers, accent elements
- **Neutrals:** Use appropriate grays for text and backgrounds

**Typography:**
- **Headers:** Playfair Display - Elegant, institutional feel
- **Body Text:** Inter - Clean, readable

## Language & Localization

**CRITICAL:** French is the **DEFAULT** and source of truth for all content.
- All initial content must be written in French
- English translations are added later via translation files in `@/messages`
- Never assume English as the primary language
- Use next-intl for all user-facing text

## Code Quality Standards

**TypeScript:**
- Strict mode enabled - no `any` types
- Explicit return types for all functions
- Proper interface definitions for all data structures

**React Patterns:**
- Server Components (RSC) by default
- Only use `'use client'` directive when interactivity is required (forms, animations, client state)
- Prefer composition over prop drilling
- Keep components focused and single-purpose

## Project Structure

```
@/components/ui          → Shadcn/Radix UI primitives
@/components/sections    → Large layout blocks (Hero, Services, etc.)
@/lib/sanity            → CMS configuration and queries
@/messages              → Localization files (fr.json, en.json)
```

## Brand Voice & Tone

**Client Context:** Mr. Kamal Alawo Adjayi (Former Mayor of Lomé, Togo)

**Voice Guidelines:**
- **Institutional Confidence** - Professional, authoritative, trustworthy
- **Sophisticated** - Refined language appropriate for high-net-worth clients
- **Measured** - Avoid hyperbole and exaggeration

**FORBIDDEN LANGUAGE:**
- No startup jargon: "rocketship," "unleash," "disrupt," "game-changer"
- No casual language: "awesome," "cool," "amazing"
- No aggressive sales language: "limited time," "act now," "don't miss out"

**PREFERRED LANGUAGE:**
- "Strategic partnership," "institutional excellence," "sustainable growth"
- "Proven expertise," "comprehensive solutions," "long-term value"
- "Rigorous analysis," "disciplined approach," "fiduciary responsibility"

## Implementation Guidelines

**When Building Components:**
1. Start with Server Components unless client interactivity is needed
2. Use Tailwind classes following the design system colors
3. Ensure all text is wrapped in next-intl translation functions
4. Follow accessibility best practices (ARIA labels, semantic HTML)
5. Optimize images and assets for performance

**When Writing Content:**
1. Write in French first
2. Use formal "vous" form, not informal "tu"
3. Maintain institutional tone throughout
4. Ensure translations preserve meaning and tone

**When Integrating Sanity CMS:**
1. Define schemas with proper validation
2. Use GROQ queries efficiently
3. Implement proper error handling for CMS data
4. Cache appropriately for performance
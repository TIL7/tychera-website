import { defineType, defineField } from 'sanity';

/**
 * Page Content Schema
 * 
 * Represents reusable content blocks for various pages.
 * Allows content managers to update text without code changes.
 * 
 * Examples:
 * - hero-title: Main hero section title
 * - hero-subtitle: Hero section subtitle
 * - about-section: About TYCHERA content
 * - contact-intro: Contact section introduction
 * 
 * Content is bilingual (French as primary, English as secondary).
 * 
 * @requirements 4.2, 4.4
 */
export const pageContent = defineType({
  name: 'pageContent',
  title: 'Page Content',
  type: 'document',
  fields: [
    defineField({
      name: 'key',
      title: 'Content Key',
      type: 'string',
      description: 'Unique identifier in kebab-case (e.g., "hero-title", "about-section")',
      validation: Rule => Rule.required().regex(/^[a-z0-9-]+$/, {
        name: 'kebab-case',
        invert: false
      }).error('Key must be in kebab-case format (lowercase letters, numbers, and hyphens only)')
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'object',
      description: 'Rich text content in French and English',
      fields: [
        { 
          name: 'fr', 
          type: 'array', 
          of: [{ type: 'block' }], 
          title: 'French (Primary)' 
        },
        { 
          name: 'en', 
          type: 'array', 
          of: [{ type: 'block' }], 
          title: 'English' 
        }
      ],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'page',
      title: 'Page',
      type: 'string',
      description: 'Which page this content belongs to',
      options: {
        list: [
          { title: 'Home', value: 'home' },
          { title: 'Expertise', value: 'expertise' },
          { title: 'About', value: 'about' },
          { title: 'Contact', value: 'contact' }
        ],
        layout: 'dropdown'
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Internal note describing what this content is for (not displayed on website)',
      rows: 2
    })
  ],
  preview: {
    select: {
      title: 'key',
      subtitle: 'page',
      description: 'description'
    },
    prepare({ title, subtitle, description }) {
      return {
        title: title,
        subtitle: `Page: ${subtitle}${description ? ` - ${description}` : ''}`
      };
    }
  }
});

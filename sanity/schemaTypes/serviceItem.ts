import { defineType, defineField } from 'sanity';

/**
 * Service Item Schema
 * 
 * Represents one of the four service pillars of TYCHERA Investments:
 * 1. Ingénierie Financière (Financial Engineering)
 * 2. Financement de Projets (Project Financing)
 * 3. Gestion de Fonds (Fund Management)
 * 4. Structuration de Deals (Deal Structuring)
 * 
 * Each service item has bilingual content (French as primary, English as secondary).
 * 
 * @requirements 4.2, 4.3
 */
export const serviceItem = defineType({
  name: 'serviceItem',
  title: 'Service Item',
  type: 'document',
  fields: [
    defineField({
      name: 'number',
      title: 'Number',
      type: 'string',
      description: 'Two-digit number (e.g., "01", "02", "03", "04")',
      validation: Rule => Rule.required().regex(/^\d{2}$/, {
        name: 'two-digit',
        invert: false
      }).error('Number must be exactly two digits (e.g., "01", "02")')
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'object',
      description: 'Service title in French and English',
      fields: [
        { 
          name: 'fr', 
          type: 'string', 
          title: 'French (Primary)',
          validation: Rule => Rule.required()
        },
        { 
          name: 'en', 
          type: 'string', 
          title: 'English',
          validation: Rule => Rule.required()
        }
      ],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'object',
      description: 'Short description for home page (2-3 sentences)',
      fields: [
        { 
          name: 'fr', 
          type: 'text', 
          title: 'French (Primary)',
          rows: 3,
          validation: Rule => Rule.required().min(50).max(300)
        },
        { 
          name: 'en', 
          type: 'text', 
          title: 'English',
          rows: 3,
          validation: Rule => Rule.required().min(50).max(300)
        }
      ],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'detailedContent',
      title: 'Detailed Content',
      type: 'object',
      description: 'Rich text content for expertise page',
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
      ]
    }),
    defineField({
      name: 'image',
      title: 'Service Image',
      type: 'image',
      description: 'Image displayed on the expertise page alongside this service (recommended: square or 4:3, min 800px)',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the image for accessibility (leave blank to hide from screen readers)',
        }),
      ],
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'Lucide icon name (e.g., "Landmark", "Briefcase", "ShieldCheck", "Handshake", "TrendingUp", "Globe")',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this service appears (1, 2, 3, ...)',
      validation: Rule => Rule.required().min(1).integer()
    })
  ],
  preview: {
    select: {
      title: 'title.fr',
      subtitle: 'number',
      order: 'order'
    },
    prepare({ title, subtitle, order }) {
      return {
        title: `${subtitle}. ${title}`,
        subtitle: `Order: ${order}`
      };
    }
  }
});

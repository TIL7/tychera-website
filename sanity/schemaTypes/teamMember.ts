import { defineType, defineField } from 'sanity';

/**
 * Team Member Schema
 * 
 * Represents a team member or principal of TYCHERA Investments.
 * Includes biographical information, role, and profile image.
 * 
 * Content is bilingual (French as primary, English as secondary).
 * 
 * @requirements 4.2, 4.3
 */
export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      description: 'Full name of the team member',
      validation: Rule => Rule.required().min(2).max(100)
    }),
    defineField({
      name: 'role',
      title: 'Role/Title',
      type: 'object',
      description: 'Professional title or role in French and English',
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
      name: 'bio',
      title: 'Biography',
      type: 'object',
      description: 'Professional biography with rich text formatting',
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
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      description: 'Professional headshot or profile photo',
      options: {
        hotspot: true,
        metadata: ['blurhash', 'lqip', 'palette']
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this team member appears',
      validation: Rule => Rule.required().min(1).integer()
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role.fr',
      media: 'image',
      order: 'order'
    },
    prepare({ title, subtitle, media, order }) {
      return {
        title,
        subtitle: `${subtitle} (Order: ${order})`,
        media
      };
    }
  }
});

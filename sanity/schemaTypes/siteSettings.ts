import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
      description: 'The main email address shown on the website.',
      validation: (rule) => rule.required().email().error('Please enter a valid email address.'),
    }),
    defineField({
      name: 'phone',
      title: 'Contact Phone',
      type: 'string',
      description: 'The main phone number shown on the website.',
      validation: (rule) => rule.required().error('Please enter a phone number.'),
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'object',
      description: 'The office address displayed in the footer and contact section.',
      fields: [
        defineField({
          name: 'line1',
          title: 'Address Line 1',
          type: 'string',
          description: 'First address line (for example, company name).',
          validation: (rule) => rule.required().error('Address line 1 is required.'),
        }),
        defineField({
          name: 'line2',
          title: 'Address Line 2',
          type: 'string',
          description: 'Second address line (optional).',
        }),
        defineField({
          name: 'line3',
          title: 'Address Line 3',
          type: 'string',
          description: 'Third address line (optional).',
        }),
      ],
    }),
    defineField({
      name: 'socials',
      title: 'Social Links',
      type: 'object',
      description: 'Social media links displayed in the footer.',
      fields: [
        defineField({
          name: 'linkedin',
          title: 'LinkedIn URL',
          type: 'url',
          description: 'Full LinkedIn page link (optional).',
          validation: (rule) => rule.uri({allowRelative: false, scheme: ['http', 'https']}),
        }),
        defineField({
          name: 'x',
          title: 'X URL',
          type: 'url',
          description: 'Full X profile link (optional).',
          validation: (rule) => rule.uri({allowRelative: false, scheme: ['http', 'https']}),
        }),
      ],
    }),
    defineField({
      name: 'logo',
      title: 'Footer Logo',
      type: 'image',
      description: 'Optional logo image used in the footer.',
      options: {hotspot: true},
    }),
    defineField({
      name: 'legalText',
      title: 'Legal Text',
      type: 'text',
      rows: 3,
      description: 'Optional legal note shown in the footer.',
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
      description: 'Optional copyright line shown at the bottom of the footer.',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Site Settings'}
    },
  },
})

'use client'

/**
 * This configuration is used to for the Sanity Studio that's mounted on the `\app\studio\[[...tool]]\page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from './sanity/schemaTypes'
import {structure} from './sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema: {
    ...schema,
    templates: (templates) => templates.filter(({schemaType}) => schemaType !== 'siteSettings'),
  },
  plugins: [
    deskTool({structure}),
    ...(process.env.NODE_ENV === 'development'
      ? [
          // Vision is available for development only
          visionTool({defaultApiVersion: apiVersion}),
        ]
      : []),
  ],
  document: {
    actions: (prev, context) =>
      context.schemaType === 'siteSettings'
        ? prev.filter(
            ({action}) =>
              action !== 'delete' &&
              action !== 'duplicate'
          )
        : prev,
  },
})

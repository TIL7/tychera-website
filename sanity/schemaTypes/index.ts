import { type SchemaTypeDefinition } from 'sanity'
import { serviceItem } from './serviceItem'
import { teamMember } from './teamMember'
import { pageContent } from './pageContent'
import { siteSettings } from './siteSettings'

/**
 * Schema Registry
 * 
 * All Sanity schemas must be registered here to be available in the Studio.
 * 
 * Schemas:
 * - serviceItem: Four service pillars (Financial Engineering, Project Financing, etc.)
 * - teamMember: Team members and principals
 * - pageContent: Reusable content blocks for various pages
 * 
 * @requirements 4.2, 4.3, 4.4
 */
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, serviceItem, teamMember, pageContent],
}

import { groq } from 'next-sanity';

/**
 * GROQ Queries for Sanity CMS
 * 
 * This module contains all GROQ queries used to fetch data from Sanity.
 * Queries are organized by content type and include proper field selection.
 * 
 * GROQ (Graph-Relational Object Queries) is Sanity's query language.
 * Learn more: https://www.sanity.io/docs/groq
 * 
 * @requirements 4.5, 4.6
 */

/**
 * Fetch all service items ordered by display order
 * 
 * Returns all four service pillars with bilingual content.
 * Used on home page (ThreePillars section) and expertise page.
 */
export const SERVICE_ITEMS_QUERY = groq`
  *[_type == "serviceItem"] | order(order asc) {
    _id,
    _createdAt,
    _updatedAt,
    number,
    title,
    description,
    detailedContent,
    icon,
    order
  }
`;

/**
 * Fetch a single service item by ID
 * 
 * Used for detailed service pages or individual service displays.
 * 
 * @param $id - The _id of the service item
 */
export const SINGLE_SERVICE_QUERY = groq`
  *[_type == "serviceItem" && _id == $id][0] {
    _id,
    _createdAt,
    _updatedAt,
    number,
    title,
    description,
    detailedContent,
    icon,
    order
  }
`;

/**
 * Fetch all team members ordered by display order
 * 
 * Returns all team members with biographical information and images.
 * Used on about page or team section.
 */
export const TEAM_MEMBERS_QUERY = groq`
  *[_type == "teamMember"] | order(order asc) {
    _id,
    _createdAt,
    _updatedAt,
    name,
    role,
    bio,
    image {
      asset->{
        _id,
        url,
        metadata {
          dimensions,
          lqip,
          blurhash
        }
      },
      alt
    },
    order
  }
`;

/**
 * Fetch a single team member by ID
 * 
 * Used for individual team member pages or detailed profiles.
 * 
 * @param $id - The _id of the team member
 */
export const SINGLE_TEAM_MEMBER_QUERY = groq`
  *[_type == "teamMember" && _id == $id][0] {
    _id,
    _createdAt,
    _updatedAt,
    name,
    role,
    bio,
    image {
      asset->{
        _id,
        url,
        metadata {
          dimensions,
          lqip,
          blurhash
        }
      },
      alt
    },
    order
  }
`;

/**
 * Fetch page content blocks for a specific page
 * 
 * Returns all content blocks associated with a page.
 * Used to populate dynamic content sections.
 * 
 * @param $page - The page identifier (e.g., "home", "expertise", "about")
 */
export const PAGE_CONTENT_QUERY = groq`
  *[_type == "pageContent" && page == $page] {
    _id,
    _createdAt,
    _updatedAt,
    key,
    content,
    page,
    description
  }
`;

/**
 * Fetch a single page content block by key
 * 
 * Returns a specific content block by its unique key.
 * Used for targeted content updates.
 * 
 * @param $key - The unique key of the content block (e.g., "hero-title")
 */
export const SINGLE_PAGE_CONTENT_QUERY = groq`
  *[_type == "pageContent" && key == $key][0] {
    _id,
    _createdAt,
    _updatedAt,
    key,
    content,
    page,
    description
  }
`;

/**
 * Fetch all content for the home page
 * 
 * Combines service items and relevant page content in a single query.
 * Optimized for home page rendering.
 */
export const HOME_PAGE_QUERY = groq`
  {
    "services": *[_type == "serviceItem"] | order(order asc) {
      _id,
      number,
      title,
      description,
      icon,
      order
    },
    "content": *[_type == "pageContent" && page == "home"] {
      _id,
      key,
      content
    }
  }
`;

/**
 * Fetch all content for the expertise page
 * 
 * Combines service items with detailed content and relevant page content.
 * Optimized for expertise page rendering.
 */
export const EXPERTISE_PAGE_QUERY = groq`
  {
    "services": *[_type == "serviceItem"] | order(order asc) {
      _id,
      number,
      title,
      description,
      detailedContent,
      icon,
      order
    },
    "content": *[_type == "pageContent" && page == "expertise"] {
      _id,
      key,
      content
    }
  }
`;

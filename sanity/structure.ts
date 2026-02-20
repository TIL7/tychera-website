import type {StructureBuilder} from 'sanity/desk'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Dashboard')
    .items([
      S.listItem()
        .id('site-settings')
        .title('Site Settings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.listItem()
        .id('services')
        .title('Services')
        .child(S.documentTypeList('serviceItem').title('Services')),
      S.listItem()
        .id('team-members')
        .title('Team Members')
        .child(S.documentTypeList('teamMember').title('Team Members')),
    ])

export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-nextjs-landing-pages'
      }
    },
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '5de475a49b80e3cfb2662446',
                  title: 'Sanity Studio',
                  name: 'hmda-lei-landing-page-studio',
                  apiId: '4e740c6e-4392-4c56-b9d5-fb664dc6a4cf'
                },
                {
                  buildHookId: '5de475a463eafddd29c632d6',
                  title: 'Landing pages Website',
                  name: 'hmda-lei-landing-page',
                  apiId: 'df7e22d9-8ab2-4052-bee3-b25d002c811f'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/mcb-11561/hmda-lei-landing-page',
            category: 'Code'
          },
          {title: 'Frontend', value: 'https://hmda-lei-landing-page.netlify.com', category: 'apps'}
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recently edited', order: '_updatedAt desc', limit: 10, types: ['page']},
      layout: {width: 'medium'}
    }
  ]
}

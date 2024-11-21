import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/guts-explorer",
  title: "Explorer Docs",
  description: "Developer Documentation",
  head: [['link', { rel: 'icon', href: '/guts-explorer/favicon.ico' }]],
  ignoreDeadLinks: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo_guts.svg',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Get started', link: '/overview' }
    ],

    sidebar: [
      {
        items: [
          { text: 'Overview', link: '/overview' },
        ]
      },
      {
        text: 'Quickstart and Development',
        link: '/development',
      },
      {
        text: 'Design',
        items: [
          { text: 'Application design', link: '/design' },
          { text: 'The backend', link: '/backend' },
          { text: 'The frontend', link: '/frontend' },
        ]
      },
      {
        text: 'Deployment (TODO)',
        link: '/deployment',
      },
      {
        text: 'Backend API Docs (TODO)',
        link: '/api'
      },
      {
        text: 'Contributing (TODO)',
        link: '/contributing'
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/guts-consortium/guts-explorer' }
    ]
  }
})

const { getNavbarByCategory } = require('./navbar')
const { getSidebarByCategory } = require('./sidebar')

module.exports = {
  title: '文档',  // 文档标题，左上角显示
  description: '文档描述',
  base: '/', // 这里写你的仓库名称
  head: [
    ['link',
      {
        rel: 'icon',
        href: '/icons/favicon.ico'
      }
    ]
  ],
  //这里配置你的网页头部信息等
  themeConfig: {
    /**
     * 设置侧边栏最大深度
     * 一般是以单个md文件中的 # ## ### #### 这几个标题文字为锚点自动生成导航
     * **/
    sidebarDepth: 3,
    // 设置侧边栏内容
    // sidebar: [
    //   {
    //     title: '第一个侧边栏',
    //     collapsable: false,  // 是否具有展开收起功能
    //     children: ['/guide/']  // 这个是根据自己的需求来订，对应自己在docs下的文件夹名，默认首页是README.md
    //   }
    // ],
    locales: {
      '/': {
        selectText: '选择语言',
        label: '简体中文',
        nav: [
          {
            text: 'D365 CRM 文档',
            link: '/CRM/'
          },
          {
            text: 'Power Platform',
            link: '/powerplatform/'
          },
          {
            text: '生态系统',
            items: getNavbarByCategory('ecosystem', 'zh')
          }
        ],
        sidebar: {
          '/CRM/': [
            {
              title: '发布',
              children: getSidebarByCategory('crmpublish', 'zh')
            },
            {
              title: '代码',
              children: getSidebarByCategory('crmcode', 'zh')
            },
            {
              title: '插件',
              children: getSidebarByCategory('crmplugin', 'zh')
            }
          ],
          '/powerplatform/': [
            {
              title: '发布',
              children: getSidebarByCategory('powerapps', 'zh')
            }
          ]
        }
      },
      '/en/': {
        selectText: 'Languages',
        label: 'English',
        nav: [
          {
            text: 'D365 CRM Document',
            link: '/en/CRM/'
          },
          {
            text: 'Power Platform',
            link: '/en/powerplatform/'
          },
          {
            text: 'Ecosystem',
            items: getNavbarByCategory('ecosystem', 'en')
          }
        ],
        sidebar: {
          '/en/CRM/': [
            {
              title: 'publish',
              children: getSidebarByCategory('crmpublish', 'en')
            },
            {
              title: 'code',
              children: getSidebarByCategory('crmcode', 'en')
            },
            {
              title: 'plug-in',
              children: getSidebarByCategory('crmplugin', 'en')
            }
          ],
          '/en/powerplatform/': [
            {
              title: 'Power Apps',
              children: getSidebarByCategory('powerapps', 'en')
            }
          ]
        }
      }
    }
  },
  locales: {
    '/': {
      lang: 'en-US'
    },
    '/en/': {
      lang: 'zh-CN'
    }
  }
}
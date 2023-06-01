const navbar = {
  ecosystem: [
    {
      'text-en': 'Repositories',
      'text-zh': '项目',
      items: [
        {
          'text-en': 'vue-typescript-admin',
          'text-zh': 'vue-element-admin管理',
          link: 'https://github.com/Armour/vue-typescript-admin-template'
        }
      ]
    },
    {
      'text-en': 'Help',
      'text-zh': '帮助',
      items: [
        {
          'text-en': 'FAQ',
          'text-zh': '常见问题',
          link: '/guide/other/faq',
        },
        {
          'text-en': 'Wechat Group',
          'text-zh': '微信群',
          link: 'https://vue-typescript-admin-template/issues/62',
        }
      ]
    }
  ]
}

function getNavbarByCategory(category, lang = 'zh') {
  const items = JSON.parse(JSON.stringify(navbar[category])) // Deep clone
  return filterNavbarItems(items, lang)
}

function filterNavbarItems(items, lang = 'zh') {
  return items.filter(v => {
    if (v[`text-${lang}`]) {
      v.text = v[`text-${lang}`]
    } else {
      v.text = v['text-zh']
    }
    if (lang != 'zh' && v.link && v.link.startsWith('/')) {
      v.link = `/${lang}${v.link}`
    }
    if (v.items && v.items.length > 0) {
      v.items = filterNavbarItems(v.items, lang)
    }
    return v
  })
}

module.exports = {
  getNavbarByCategory
}

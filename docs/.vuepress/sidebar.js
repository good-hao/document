const sidebar = {
  'crmpublish': [
    '/CRM/publish/operation'
  ],
  'crmcode': [
    '/CRM/code/qianduan',
    '/CRM/code/houtai'
  ],
  "crmplugin":[
    '/CRM/plug-in/PluginRegistration'
  ],
  'powerapps':[
    '/powerplatform/powerapps/code',
    '/powerplatform/powerapps/view'
  ],
  'powerautomate':[
    '/powerplatform/powerautomate/view'
  ]
}

function getSidebarByCategory(category, lang = 'zh') {
  const links = JSON.parse(JSON.stringify(sidebar[category])) // Deep clone
  return links.map(link => {
    if (lang != 'zh' && link.startsWith('/')) {
      return `/${lang}${link}`
    }
    return link
  })
}

module.exports = {
  getSidebarByCategory
}

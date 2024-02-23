const modules = require('../modules')

let sidebar = {}

modules.forEach(item => {
    sidebar['/'+item.text+'/'] = item.items.map(o => o.text)
})

module.exports = sidebar;

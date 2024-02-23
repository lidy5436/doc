const modules = require('../modules')
let navbar = [
    {
        text: '首页',
        link: '/'
    }
]
navbar = navbar.concat(modules)
navbar.push(
    {
        text: '常用书签',
        link: 'http://120.48.99.149:1888/'
    }
)

module.exports = navbar

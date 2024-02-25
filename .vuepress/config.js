const days = require('dayjs')

const navbar = require("./navbar");
const sidebar = require("./sidebar")
const footer = require('./footer')

module.exports = {
    title: '李东阳的编程宝典',
    description: '一个专注于开发的个人笔记与知识分享平台',
    lang: 'zh-CN',
    head: [
        ["link", {rel: "icon", href: "/logo.png"}],
    ],
    cache: false,
    plugins: [
        ['vuepress-plugin-helper-live2d'],
        ['vuepress-plugin-zooming'],
        ['@xiaopanda/vuepress-plugin-code-copy'],
        ['@vuepress/last-updated',
            {
                transformer: (timestamp, lang) => {
                    return days(timestamp).format('YYYY-MM-DD HH:mm')
                }
            }
        ]
    ],
    themeConfig: {
        logo: '/logo.png',
        nav: navbar,
        sidebar: sidebar,
        footer: footer,
        lastUpdated: '最后更新时间',
        repo: 'https://gitee.com/lidy5436',
        repoLabel: 'Gitee'
    },
    markdown: {
        lineNumbers: false
    }
}

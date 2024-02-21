const days = require('dayjs')

const navbar = require("./navbar");
const sidebar = require("./sidebar")
const footer = require('./footer')

module.exports = {
    title: '李东阳的博客',
    description: '一个专注于开发的个人笔记分享平台',
    lang: 'zh-CN',
    head: [
        ["link", { rel: "icon", href: "/logo.png" }],
    ],
    plugins: [
        ['vuepress-plugin-code-copy',
            {
                successText: "复制成功"
            }
        ],
        ['@vuepress/last-updated',
            {
                transformer: (timestamp,lang) =>{
                    return  days(timestamp).format('YYYY-MM-DD HH:mm')
                }
            }
        ]
    ],
    themeConfig: {
        logo: '/logo.png',
        nav: navbar,
        sidebar: sidebar,
        footer:footer,
        lastUpdated: '最后更新时间',
        repo: 'https://gitee.com/lidy5436',
        repoLabel: 'Gitee'
    },
    markdown:{
        lineNumbers: true
    }
}

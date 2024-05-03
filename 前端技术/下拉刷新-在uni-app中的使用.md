# 下拉刷新-在uniapp中的使用

1、配置页面开启下拉刷新

```json
{
    "path": "pages/home/home",
    "style": {
        "navigationBarTitleText": "首页",
        "enablePullDownRefresh": true
    }
}
```

2、设置下拉刷新的数据源

```vue
<template>
  <view>
    <view class="home-content" v-for="(item,index) in list" :key="index">
      {{ item }}
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      list: [
        '第1条内容',
        '第2条内容',
        '第3条内容',
        '第4条内容',
        '第5条内容',
        '第6条内容'      ]
    };
  },
  onPullDownRefresh() {
    setTimeout(() => {
      this.list = [
        '第1条内容',
        '第2条内容',
        '第3条内容',
        '第4条内容',
        '第5条内容',
        '第6条内容',
        '第7条内容',
        '第8条内容',
        '第9条内容',
        '第10条内容'      ],
          uni.stopPullDownRefresh()
    }, 2000)
  },
  methods: {}
}
</script>

<style lang="scss">
</style>
```


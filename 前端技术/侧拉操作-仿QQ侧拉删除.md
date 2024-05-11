# 侧拉操作-仿QQ侧拉删除

lidy-sideslip 可侧拉的列表组件,多端兼容，已发布至uniapp插件市场。

地址如下:  https://ext.dcloud.net.cn/plugin?id=18033

## 基本使用

- vue结构

```vue
<template>
	<view>
		<lidy-sideslip>
			<lidy-sideslip-item ref="lidySideslipItemRef" v-for="(item,index) in list" :data="item" :key="index"
				:options="options" @OptionsSideslipClick="handleOption">
				<view class="card">{{item}}</view>
			</lidy-sideslip-item>
		</lidy-sideslip>
	</view>
</template>
```
- JavaScript结构


```js
export default {
    data() {
        return {
            list: ['第一条数据','第二条数据','第三条数据','第四条数据','第五条数据','第六条数据'],
            options: [
                {title: '关注',code: 'follow',background: '#FBC21C'},
                {title: '删除',code: 'del',background: '#FF0000'}
            ]
        }
    },
    onLoad() {

    },
    methods: {
        handleOption(code, item) {
            switch (code) {
                case 'follow':
                    console.log("点击了【关注】,提交了数据:" + item)
                    break
                case 'del':
                    console.log("点击了【删除】,提交了数据:" + item)
                    break
                default:
                    break
            }
            this.closeSideslipItem()
        },
        /**
			 * 关闭所有子标签
			 */
        closeSideslipItem() {
            const size = this.$refs.lidySideslipItemRef.length
            for (let i = 0; i < size; i++) {
                this.$refs.lidySideslipItemRef[i].resetTouch()
            }
        }
    }
}
```
- css结构

```css
.card {
    height: 45px;
    display: flex;
    align-items: center;
    padding-left: 12px;
}
```

## API详解

### lidy-sideslip-item Props

|       属性名       |  类型  |       默认值       |                  说明                   |
| :----------------: | :----: | :----------------: | :-------------------------------------: |
|        data        | Object |   必填，无默认值   |              每条列表数据               |
|      options       | Array  | 默认为单个删除按钮 | 操作列配置,为多个对象数组,对象属性如下: |
|   options.title    | String |   必填，无默认值   |              右侧按钮标题               |
|    options.code    | String |   必填，无默认值   |            右侧按钮唯一编码             |
| options.background | String |   必填，无默认值   |            右侧按钮背景颜色             |

### ListItem Events

|       事件名称       |       说明       |                返回参数                |
| :------------------: | :--------------: | :------------------------------------: |
| OptionsSideslipClick | 右侧按钮点击事件 | e=>{code:按钮唯一编码,data:当前行数据} |

[完整演示代码下载](https://github.com/lidy5436/plugin-code)

## 插件核心实现如下

lidy-sideslip.vue

```vue
<template>
	<scroll-view class="scroll-view" scroll-y>
		<slot></slot>
	</scroll-view>
</template>

<script>
	/**
	 * lidy-sideslip 侧拉组件容器
	 * @description 侧拉组件外部容器，用于收集侧滑明细条目的容器
	 * 
	 */
	export default {
		name: 'lidy-sideslip',
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style scoped>
</style>
```

lidy-sideslip-item.vue

```vue
<template>
	<view class="container-wrapper" :style="{
		width: `calc(100% + ${optionWidth}px)`,
		marginLeft: `-${optionWidth}px`,
		transform: isTouchMove?`translateX(0px)`:`translateX(${optionWidth}px)`
	}">
		<view class="container" @touchstart="touchstart" @touchend="touchend">
			<slot></slot>
		</view>
		<view class="options-wrapper">
			<view class="option-title" v-for="(option,index) in options" :key="index"
				:style="{backgroundColor: `${option.background}`}" @click="handleOptions(option.code)">
				{{option.title}}
			</view>
		</view>
	</view>
</template>

<script>
	/**
	 * 侧滑操作子组件
	 * @description 侧滑操作子组件，用于存放侧滑的明细条目数据
	 * @property {Object} 	data  		明细条数据，必填
	 * @property {Array} 	options		自定义操作列
	 * 	@value {String}		title		操作栏标题,必填
	 * 	@value {String}		code		唯一编码,必填,唯一
	 * 	@value {String}		background	操作栏颜色
	 * @event {Function}	OptionsSideslipClick(code,data) 	侧边栏点击事件
	 * 	@value {String}		code		按钮唯一编码
	 * 	@vlaue {Object}		data		明细数据
	 * 
	 */
	export default {
		name: 'lidy-sideslip-item',
		emits: ['OptionsSideslipClick'],
		props: {
			data: {
				require: true
			},
			options: {
				type: Array,
				default: () => [{
					title: '删除',
					code: 'del',
					background: '#FF0000'
				}]
			},
		},
		computed: {
			optionWidth() {
				const width = this.options.length * 70
				return width
			}
		},
		data() {
			return {
				touchStartX: undefined,
				isTouchMove: false
			}
		},
		methods: {
			handleOptions(code) {
				this.$emit("OptionsSideslipClick", code, this.data)
			},
			touchstart(e) {
				this.touchStartX = e.changedTouches[0].clientX;
			},
			touchend(e) {
				const touchStartX = this.touchStartX
				const touchEndX = e.changedTouches[0].clientX;

				if (touchStartX - touchEndX > 80) {
					this.isTouchMove = true
				} else {
					this.isTouchMove = false
				}
			},
			resetTouch() {
				this.isTouchMove = false
			},

		}
	}
</script>

<style lang="scss" scoped>
	.container-wrapper {
		position: relative;
		box-sizing: border-box;
		transition: all 0.3s;

		.container {
			position: relative;
			width: 100%;
		}

		.options-wrapper {
			position: absolute;
			top: 0;
			right: 0;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: space-around;
			z-index: 999;
			color: white;

			.option-title {
				background-color: red;
				height: 100%;
				width: 70px;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
</style>
```


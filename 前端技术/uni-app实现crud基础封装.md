# uniapp实现crud(增删改查)基础封装
1. 依赖组件
    基础封装依赖于uin-app的基础组件，依赖于以下组件：

 ```
 uni-popup,uni-forms,uni-fab
 ```



1. basic-crud.vue

```vue
<template>
	<view class="container-wrapper" :style="{
		width: `calc(100% + ${optionWidth}px)`,
		marginLeft: `-${optionWidth}px`,
		transform:isTouchMove?`translateX(0px)`:`translateX(${optionWidth}px)`
	}">
		<view class="container" @touchstart="touchstart" @touchend="touchend">
			<slot name="container"></slot>
		</view>
		<slot name="options"></slot>
	</view>
</template>

<script>
	export default {
		props: {
			optionWidth: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				touchStartX: undefined,
				// 是否打开侧边栏
				isTouchMove: false,
			}
		},
		methods: {
			resetTouch(){
				this.isTouchMove = false
			},
			touchstart(e) {
				this.touchStartX = e.changedTouches[0].clientX;
			},
			touchend(e) {
				const touchStartX = this.touchStartX
				const touchEndX = e.changedTouches[0].clientX;
				if(touchStartX - touchEndX > 80){
					this.isTouchMove = true
				}else{
					this.isTouchMove = false
				}
			}
		}
	}
</script>

<style scoped>
	.container-wrapper {
		margin-top: 24rpx;
		position: relative;
		box-sizing: border-box;
		transition: all 0.3s;
	}

	.container {
		position: relative;
		width: 100%;
	}
</style>
```

2. index.vue

```vue
<template>
	<view class="content">
		<scroll-view class="scroll-view" scroll-y>
			<basic-crud ref="basicCrud" :option-width="110" v-for="(item,index) in list" :key="index">
				<template v-slot:container>
					<view class="card">
						<view class="header-wrap">
							<view class="title-wrap">
								<view class="dot"></view>
								<text class="title">{{ item.title }}</text>
							</view>
							<text class="time">{{ item.createdTime }}</text>
						</view>
						<view class="remark">
							<text class="msg">{{ item.remark  }}</text>
						</view>
					</view>
				</template>
				<template v-slot:options>
					<view class="options-wrapper">
						<view @click="handleEdit(item)">
							编辑
						</view>
						<view @click="handleRemove(item)">
							删除
						</view>
					</view>
				</template>
			</basic-crud>
		</scroll-view>
		<uni-popup ref="popup" type="bottom" background-color="#FFF" border-radius="10px 10px 0 0" :closeable="true">
			<view class="popup-header">
				<view class="popup-header-title">
					新增
				</view>
				<view class="popup-header-close" @click="closePopup">
					<icon type="cancel"></icon>
				</view>
			</view>
			<view class="popup-main">
				<uni-forms :model-value="form">
					<uni-forms-item label="编码" name="maintenanceCode">
						<input type="text" v-model="form.maintenanceCode" placeholder="请输入编码" />
					</uni-forms-item>
					<uni-forms-item label="标题" name="title">
						<input type="text" v-model="form.title" placeholder="请输入标题" />
					</uni-forms-item>
					<uni-forms-item label="类型" name="type">
						<input type="text" v-model="form.type" placeholder="请输入类型" />
					</uni-forms-item>
					<uni-forms-item label="时间" name="createdTime">
						<input type="text" v-model="form.createdTime" placeholder="请输入时间" />
					</uni-forms-item>
					<uni-forms-item label="备注" name="remark">
						<textarea type="text" v-model="form.remark" placeholder="请输入备注" />
					</uni-forms-item>
				</uni-forms>
			</view>
			<view class="uni-share-button-box">
				<button class="uni-share-button" type="primary" @click="handleSumbit(dialogType)">确 认</button>
			</view>
		</uni-popup>
		<uni-fab horizontal="right" vertical="bottom" @fabClick="handleAddOpen"></uni-fab>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dialogType: undefined,
				form: {
					id: undefined,
					maintenanceCode: undefined,
					title: undefined,
					type: undefined,
					createdTime: undefined,
					remark: undefined,
					isRead: undefined
				},
				list: [{
						"id": "116",
						"maintenanceCode": "BY220810000002",
						"title": "工单消息",
						"type": "care",
						"createdTime": "2022-08-10 10:09:56",
						"remark": "收到一个新的【保养工单】，点击查看详情。",
						"isRead": "0"
					},
					{
						"id": "120",
						"maintenanceCode": "WX220820000011",
						"title": "工单消息",
						"type": "maintain",
						"createdTime": "2022-08-10 10:09:56",
						"remark": "收到一个新的【维修工单】，点击查看详情。",
						"isRead": "0"
					},
					{
						"id": "123",
						"maintenanceCode": "BY220820000002",
						"title": "工单消息",
						"type": "care",
						"createdTime": "2022-08-10 10:09:56",
						"remark": "收到一个新的【保养工单】，点击查看详情。",
						"isRead": "0"
					},
					{
						"id": "124",
						"maintenanceCode": "WX220820000002",
						"title": "工单消息",
						"type": "maintain",
						"createdTime": "2022-08-10 10:09:56",
						"remark": "收到一个新的【维修工单】，点击查看详情。",
						"isRead": "0"
					}
				]
			}
		},
		onLoad() {

		},
		computed: {},
		methods: {
			resetTouch() {
				const size = this.$refs.basicCrud.length
				for (let i = 0; i < size; i++) {
					this.$refs.basicCrud[i].resetTouch()
				}
			},
			handleAddOpen() {
				this.dialogType = 'add'
				this.$refs.popup.open()
			},
			handleEdit(item) {
				this.dialogType = 'edit'
				this.form = item
				this.$refs.popup.open()
			},
			handleRemove(item) {
				uni.showModal({
					title: '删除',
					content: '此操作将永久删除,是否继续?',
					success: (res) => {
						if (res.confirm) {
							this.dialogType = 'del'
							const list = this.list.filter(i => i.id !== item.id)
							this.list = list
							this.resetTouch()
						} else if (res.cancel) {
							this.resetTouch()
						}
					}
				})


			},
			closePopup() {
				this.dialogType = undefined
				this.$refs.popup.close()
				this.resetTouch()
			},
			handleSumbit(dialogType) {
				const item = this.form
				switch (dialogType) {
					case 'add':
						console.log('add')
						this.list.unshift(item)
						break;
					case 'edit':
						console.log('edit')
						const index = this.list.findIndex(i => i.id === item.id)
						this.list.splice(index, 1, item)
						break;
					default:
						break;
				}
				this.closePopup()
			}

		}
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 100%;
		height: 100vh;
		background-color: rgba(245, 246, 248, 1);
	}

	.scroll-view {
		width: 100%;
		height: 100%;
	}

	.options-wrapper {
		position: absolute;
		right: 0;
		top: 0;
		width: 200rpx;
		height: 171rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;
		z-index: 999;
	}

	.uni-share-button-box {
		display: flex;
		flex-direction: row;
		padding: 10px 15px;
	}

	.uni-share-button {
		flex: 1;
		border-radius: 50px;
		color: #FFF;
		font-size: 16px;
		margin: 0 10rpx;
	}

	.uni-share-button::after {
		border-radius: 50px;
	}
	.popup-header {
		margin: 10rpx 15rpx 10rpx 35rpx;
		display: flex;

		.popup-header-title {
			font-weight: bold;
			flex: 1;
		}
	}
	.popup-main {
		margin: 0 15px;
	}
	.card {
		margin-left: 24rpx;
		width: 702rpx;
		height: 171rpx;
		padding: 28rpx 24rpx;
		box-sizing: border-box;
		border-radius: 24rpx;
		background-color: white;
	}
</style>
```


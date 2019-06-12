<template>
	<div id="app">
		<!-- <div id="nav">
		<router-link to="/">Home</router-link> |
		<router-link to="/about">About</router-link>
		<button v-if="$store.state.user.isLogin" @click="logout">注销</button>
		</div>
		<router-view /> -->
		<transition :name="transitionName">
			<router-view class="child-view" />
		</transition>
		<!-- <cube-tab-bar
		v-model="selectedLabelDefault"
		:data="tabs"
		@click="clickHandler"
		@change="changeHandler">
		</cube-tab-bar> -->
		<cube-tab-bar v-model="selectedLabelDefault" :data="tabs" @click="clickHandler" @change="changeHandler">
			<cube-tab v-for="(item, index) in tabs" 
				:icon="item.icon" :label="item.value" :key="index">
				<div>{{item.label}}</div>
				<span class="badge" v-if="item.label=='Cart'">{{cartTotal}}</span>
			</cube-tab>
		</cube-tab-bar>
	</div>
</template>
<script>
	import {mapGetters} from 'vuex'
  	export default{
		data() {
			return {
				transitionName: 'route-forward',
				selectedLabelDefault: 'Vip',
				tabs: [
					{
						label: 'Home',
						value: "/",
						icon: 'cubeic-home'
					}, 
					{
						label: 'Cart',
						value: "/cart",
						icon: 'cubeic-like'
					},
					{
						label: 'Me',
						value: "/login",
						icon: 'cubeic-person'
					}
				],

			}
		},
		computed: {
			...mapGetters(['cartTotal'])
		},
		created () {
			this.selectedLabelDefault = this.$route.path;
		},
		watch: {
			$route(route) {
				this.selectedLabelDefault = route.path;

				this.transitionName = this.$router.transitionName
			}
		},
		methods: {
			clickHandler (value) {
				this.$router.push(value)
			},
			changeHandler (label) {
				this.$createDialog({
					type: 'alert',
					title: 'tabbar',
					content: `当前选${label}`,
					icon: 'cubeic-alert'
				}).show()
			},
			logout(){
				this.$store.dispatch('logout')
			}
		}
  	}
</script>
<style lang="stylus">
html,body,#app 
	width:100%;
	height:100%;
</style>
<style lang="stylus" scoped>
.cube-tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #edf0f4;
}

.cube-tab-bar-slider {
  top: 0;
}

// 动画
// .route-move-enter { // 入场前状态
//   transform: translate3d(-100%, 0, 0);
// }

// .route-move-leave-to { // 离场后状态
//   transform: translate3d(100%, 0, 0);
// }

// .route-move-enter-active, .route-move-leave-active { // 激活状态
//   transition: transform 0.3s;
// }

.route-forward-enter {
  transform: translate3d(-100%, 0, 0);
}
.route-back-enter {
  transform: translate3d(100%, 0, 0);
}
/* 出场后 */
.route-forward-leave-to {
  transform: translate3d(100%, 0, 0);
}
.route-back-leave-to {
  transform: translate3d(-100%, 0, 0);
}
.route-forward-enter-active,
.route-forward-leave-active,
.route-back-enter-active,
.route-back-leave-active {
  transition: transform 0.3s;
}



.child-view { // 添加到每个页面上的样式，确保页面间不挤占位置
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  padding-bottom: 40px;
}

.cube-tab {
  position: relative;
}

span.badge {
  background: red;
  color: white;
  border-radius: 50%;
  padding: 2px;
  min-width: 16px;
  min-height: 16px;
  position: absolute;
  right: 25%;
  top: 0;
}
</style>

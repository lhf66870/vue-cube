<template>
	<div class="home">
		<w-header title="Rversion">
			<i class="cube-tag"></i>
		</w-header>
		<!-- 轮播图 -->
		<cube-slide :data="slide" :interval="5000">
			<cube-slide-item v-for="(item,index) in slide" :key="index">
				<router-link :to="`/detail/${item.id}`">
				  <img class="slider" :src="item.image">
				</router-link>
			</cube-slide-item>
		</cube-slide>

		<!-- 商品列表 startCartAnim-->
		<!-- <good-list :data="goods" @cartanim="$refs.ca.start($event)"></good-list> -->
		<good-list :data="goods" @cartanim="startCartAnim"></good-list>
		<!-- 动画组件 -->
    <!-- <cart-anim ref="ca"></cart-anim> -->
	</div>
</template>

<script>
import axios from 'axios'
import gd from '@/service/goods'
import GoodList from "@/components/GoodList.vue";
import CartAnim from '@/components/CartAnim.vue'
import WHeader from '@/components/Header.vue'
export default {
	name: "home",
	components :{
		GoodList,
		// CartAnim,sss
		WHeader
	},
	data() {
		return {
			goodsInfo: [],
			slide: [],
			keys: []
		}
	},
	computed: {
		goods() {
			// [[{},{}],[{}]] => [{},{},{}]
			return this.keys.flatMap(key => this.goodsInfo[key])
		}
	},
	created () {
		gd.getGoods().then(data=>{
			if (data) {
				const {goodsInfo, slide, keys} = data;
				this.goodsInfo = goodsInfo;
				this.slide = slide;
				this.keys = keys;
			}
		});
	},
	methods: {
		startCartAnim(el){
			// const anim = this.$createCartAnim({
			// 	onTransitionend(){
			// 		anim.remove()
			// 	}
			// })
			// anim.start(el)
			 // 使用方式2
      const anim = this.$create(CartAnim, {
        pos: {left:'46%', bottom:'30px'}
      });
      anim.start(el);
      anim.$on('transitionend', anim.remove)
		}
	},
};
</script>
<style lang="stylus" scoped>
.home 
	width:100%;
.cube-slide {
  height: auto;
}

.cube-slide-item > a > img {
  width: 100%;
  height: auto;
}
</style>
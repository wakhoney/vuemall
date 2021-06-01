<template>

    <swiper class="detail-swiper">
<!--      当我们在使用v-for进行渲染时，尽可能使用渲染元素自身属性的id给渲染的元素绑定一个key值，
      这样在当前渲染元素的DOM结构发生变化时，能够单独响应该元素而不触发所有元素的渲染。-->

      <swiper-item v-for="(item,index) in topImages" :key=index><!--是组件最好绑定一个key-->
        <img :src="item" alt="">
      </swiper-item>
    </swiper>

</template>

<script>
  import {Swiper,SwiperItem} from 'components/common/swiper' /*默认会自动找index.js*/
export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  props:{
    topImages: {
      type: Array,
      default() {
        return[]
      }
    }
  }

}
</script>

<style scoped>
  .detail-swiper {
    height: 300px;
    overflow: hidden;
  }
</style>

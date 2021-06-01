<template>
  <swiper>
    <swiper-item v-for="item in banners"><!--v-for如果在标签中就会每遍历一个东西都会创建一个标签-->
      <a :href="item.link"><!--这里要用item里的item.link属性,所以必须用v-bind属性绑定,不然把item.link看作字符串地址-->
        <img :src="item.image" alt="" @load="imageLoad"><!--onload事件是在src的资源加载完毕的时候,才会触发-->
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper' /*默认会自动找index.js*/
export default {
name: "ChildComps",
  components: {
    Swiper,
    SwiperItem,
  },
  props: {

    banners : {
      type: Array,
      /*重点:*/
      /*类型是对象或数组时,默认值必须是一个函数*/
      default(){
        return[]
      }
    }

  },data(){
    return{
      isload:false
    }
  },
  methods:{
    imageLoad(){
      if(!this.isload){
        this.$emit('swiperImageLoad')
        this.isload=true
      }

    }
  }

}
</script>

<style scoped>

</style>

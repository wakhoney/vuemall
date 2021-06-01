<template>
  <div class="goods">
<!--组件的嵌套有利于数据处理,
    组件的嵌套样式限定-->
    <goods-list-item v-for="item in goods" :goods-item="item"/><!--没有插槽就用单标签就可以了-->
  </div>
</template>

<script>
import GoodsListItem from "components/content/goods/GoodsListItem";
export default {
name: "GoodsList",
  components:{
  GoodsListItem
  },
  props: {
  goods:{
    type: Array,
    default(){
      return[]
    }
  }
  }
}
</script>

<style scoped>
  .goods {
    display: flex;/*首先要给父容器设置display:flex(或者inline-flex)属性，就可以让该父容器的布局方式变为弹性盒模型，接着，给父容器或者子元素设置不同属性来实现具体布局。*/
    flex-wrap: wrap;/*flex-wrap 属性规定flex容器是单行或者多行，同时横轴的方向决定了新行堆叠的方向,规定灵活的项目在必要的时候拆行或拆列*/
    justify-content: space-around;/*justify-content 用于设置或检索弹性盒子元素在主轴（横轴）方向上的对齐方式。*/
  }
</style>

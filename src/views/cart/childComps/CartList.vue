<template>
  <div class="cart-list">
      <scroll class="content" ref="scroll">

        <cart-list-item
          v-for="(item,index) in cartList"
          :product="item"
          :key="index"/>

<!--        用table补齐-->
<!--        <li>内容1</li>
        <li>内容2</li>
        <li>内容3</li>
        <li>内容4</li>
        <li>内容5</li>-->

      </scroll>

  </div>
</template>

<script>
import {mapGetters} from 'vuex'/*在组件中引入mapGetters就是将vuex中的数据映射到组件的计算属性当中，在组件不多，组件的数据通信不是很多的时候这样写看似将简单的东西复杂化了，但是在稍复杂点的项目中这样会极大的减少工作量，及组件之间数据传递的复杂程度。*/
import Scroll from "components/common/scroll/Scroll";
import CartListItem from "views/cart/childComps/CartListItem";
export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters(['cartList'])
  },activated() {
    this.$refs.scroll.refresh();
  }
}
</script>

<style scoped>
.cart-list {
  height: calc(100% - 44px - 49px - 40px);/*calc() 函数允许我们在属性值中执行数学计算操作。*/
}

  .content {
    /*这里的100%相对于父元素*/
    height: 100%;
    overflow: hidden;
  }
</style>

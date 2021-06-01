<template>
  <div class="cart">
<!--    导航-->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>

<!--    商品列表-->
      <cart-list/>

<!--    底部汇总-->
    <cart-bottom-bar></cart-bottom-bar>

  </div>
</template>

<script>

import NavBar from "components/common/navbar/NavBar";
import {mapGetters} from "vuex"/*在组件中引入mapGetters就是将vuex中的数据映射到组件的计算属性当中，在组件不多，组件的数据通信不是很多的时候这样写看似将简单的东西复杂化了，但是在稍复杂点的项目中这样会极大的减少工作量，及组件之间数据传递的复杂程度。*/
import CartList from "views/cart/childComps/CartList";
import CartBottomBar from "views/cart/childComps/CartBottomBar";
export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar

  },
  computed: {
    ...mapGetters({
      length: 'cartLength'
    })
    /*...mapGetters(['cartLength'])名不一样时可以这样映射*/
  }
}
</script>

<style scoped>
.cart {
  height: 100vh;
}

.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>

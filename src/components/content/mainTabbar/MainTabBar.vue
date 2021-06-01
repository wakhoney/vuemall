<template>
  <tab-bar><!--支撑驼峰转羊肉串形式-->

    <tab-bar-item path="/home" activeColor="blue"><!--属性传进去一些东西时,如果有变量时绑定属性需要v-bind;如果只是字符串就没必要加:-->
      <img slot="item-icon-active" src="~assets/img/tabbar/home.svg" alt="">
      <img slot="item-icon" src="~assets/img/tabbar/home_active.svg" alt="">
      <div slot="item-text">首页</div>
    </tab-bar-item>

    <tab-bar-item path="/category" activeColor="blue"><!--属性传进去一些东西时,如果有变量时绑定属性需要v-bind;如果只是字符串就没必要加:-->
      <img slot="item-icon-active" src="~assets/img/tabbar/category.svg" alt="">
      <img slot="item-icon" src="~assets/img/tabbar/category_active.svg" alt="">
      <div slot="item-text">分类</div>
    </tab-bar-item>

    <tab-bar-item  path="/cart" activeColor="blue"><!--属性传进去一些东西时,如果有变量时绑定属性需要v-bind;如果只是字符串就没必要加:-->
      <img slot="item-icon-active" src="~assets/img/tabbar/shopcart.svg" alt="">
      <img slot="item-icon" src="~assets/img/tabbar/shopcart_active.svg" alt="">
      <div slot="item-text">购物车</div>
    </tab-bar-item>

    <tab-bar-item  path="/profile" activeColor="blue"><!--属性传进去一些东西时,如果有变量时绑定属性需要v-bind;如果只是字符串就没必要加:-->
      <img slot="item-icon-active" src="~assets/img/tabbar/profile.svg" alt="">
      <img slot="item-icon" src="~assets/img/tabbar/profile_active.svg" alt="">
      <div slot="item-text">我的</div>
    </tab-bar-item>

  </tab-bar>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";
export default {
name: "MainTabBar",
  components:{
    TabBar,
    TabBarItem
  }
}
</script>

<style scoped>

</style>

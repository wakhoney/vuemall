<template>
  <div class="nav-bar">

    <div class="left">
      <slot name="left"></slot>
    </div>

    <div class="center">
      <slot name="center"></slot>
    </div>

    <div class="right">
      <slot name="right"></slot>
    </div>

  </div>
</template>

<script>
export default {
name: "NavBar"
}
</script>

<style scoped>
  .nav-bar {
    display: flex;/*弹性布局,会让浮动失效,可以让盒子更加灵活*/
    height: 44px;
    line-height: 44px;/*设置行高的,能把div盒子撑起来,可以不设置hight了,缺点是有内容才生效*/
    text-align: center;
    box-shadow: 0 1px 1px rgba(100,100,100,0.2);/*阴影*/
    /*封装组件时,不是完全公共的东西不要写死,封装的作用就是复用性高*/
  }

  .left,.right {
    width: 60px;
  }

  .center {
    flex: 1;/*设置为1,就会把全部的占据*/
  }

</style>

<!--这样抽离组件后发现在TabBar.vue组件内逻辑还是太乱了,里面还有tab-bar-item的文字和图片样式等等,怎么办?继续抽离组件-->
<template>
  <div id="tab-bar"><!--在最外层嵌套个div是为了设置样式-->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar"
}
</script>

<style scoped>
#tab-bar {
  /*组件封装对应的样式要拿过来,这样就清晰了,想用这组件就引用TabBar.vue这文件就可以了*/
  /*display 属性规定元素应该生成的框的类型*/
  display: flex;/*flex:容器布局*/
  background-color: #f6f6f6;
  position: fixed;/*成绝对定位的元素，相对于浏览器窗口进行定位。 元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。*/
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0px -3px 1px rgba(100,100,100,0.3);/*第一个参数是x轴,第二个参数y轴,第三个参数是模糊程度,还有个颜色属性rgba()*/
}

/*.tab-bar-item {
  flex: 1;!*均等分*!
  text-align: center;
  height: 49px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
}*/
</style>

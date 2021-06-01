<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item"><!--这里要展示多个,遍历就可以了-->
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default: function (){
        return[]
      }
    }
  }
}
</script>

<style scoped>
  .recommend {
    display: flex;
    text-align: center;
    font-size: 13px;
    /*比如: 定义样式,要定义里面的--如一个正方形,我们要在正方形属性上定义里面内容的布局*/
    padding: 10px 0 10px;
    border-bottom: 10px solid #eee;
  }

  .recommend-item {
    flex: 1;
  }

  .recommend-item img {
    width: 65px;
    height: 65px;
    margin-bottom: 2px;
  }
</style>

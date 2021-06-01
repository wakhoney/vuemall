<template>
  <div class="goods-item" @click="itemclick">
    <!--用vue-lazyload插件做图片懒加载后替换 :src="showImage"-->
    <img v-lazy="showImage" @load="imageLoad" alt=""/>
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return{}
      }
    }
  },
computed:{
    showImage(){
      return this.goodsItem.image || this.goodsItem.show.img
    }
    },
  methods: {
    imageLoad(){
          /*因为我们GoodsListem.vue组件不仅在home中用,在详情页的推荐中也用,但在GoodsListem.vue中
      监听加载后抛出的事件会在home中有个总线监听,所以感觉详情页的事件在home中监听非常不合理,有如
      下两种解决方案*/

      /*1.通过路由判断*/
      /*if(this.route.path.indexOf('/home')){
        this.$bus.$emit('homeItemImgLoad')
      }else if(this.route.path.indexOf('/detail')){
        this.$bus.$emit('detailItemImgLoad')
      }*/

      /*事件总线和vuex很像,vuex是管理状态的,事件总线是管理事件的*/
      this.$bus.$emit('itemImgageLoad')


    },
    itemclick(){
     /* console.log(this.goodsItem.iid);*/
      this.$router.push('/detail/'+this.goodsItem.iid)
    }
  }
}
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 46%;
  }

  .goods-item img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;/*超出部分*/
    text-overflow: ellipsis;/*ellipsis	显示省略符号来代表被修剪的文本。*/
    white-space: nowrap;/*文本不会换行，文本会在在同一行上继续，直到遇到 <br> 标签为止。*/
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before{
    content: '';
    position: absolute;
    left: -15px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;

  }
</style>

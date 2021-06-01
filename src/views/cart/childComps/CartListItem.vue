<template>
  <div id="shop-item">

    <div class="item-selector">
      <check-button :is-check = "product.checked" @click.native="checkClick"></check-button>
    </div>

    <div class="item-img">
      <img :src="product.image" alt="商品图片" />
    </div>

    <div class="item-info">
      <div class="item-title">{{product.title}}</div>
      <div class="item-desc">商品描述: {{product.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">￥{{product.nowprice}}</div>
        <div class="item-count right">x{{product.count}}</div>
      </div>
    </div>
  </div>

</template>

<script>
import CheckButton from "views/detail/childComps/CheckButton";
export default {
  name: "CartListItem",
  components: {
    CheckButton
  },
  props: {
    product:{
    type: Object,
    default(){
      return {}
    }
    }
  },
  methods: {
    checkClick(){
      this.product.checked = !this.product.checked

    }
  }

}
</script>

<style scoped>
#shop-item {
  width: 100%;
  display: flex;
  font-size: 0;/*在父元素很有必要设置font-size:0，避免莫名其妙的间距。*/
  padding: 5px;/*内边距属性。*/
  border-bottom: 1px solid #ccc;
}

.item-selector {
  width: 20px;
  display: flex;
  justify-content: center;/*元素中的各项周围留有空白*/
  align-items: center;
}

.item-title, .item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.item-img {
  padding: 5px;
  /*border: 1px solid #ccc;*/
}

.item-img img {
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 5px;
}

.item-info {
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  position: relative;
  overflow: hidden;
}

.item-info .item-desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}

.info-bottom {
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}

.info-bottom .item-price {
  color: orangered;
}.item-img img{
   /* width: 100px; */
   height: 100%;
 }
.item-info{
  flex: 1 1;
}

</style>

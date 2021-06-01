<template>
  <div class="bottom-bat">
    <div class="bar-item bar-left"><!--这里有两个样式:bar-item 和 bar-left,当bar-item bar-left时对bar-left有效,而其他的对bar-item有效-->
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>

    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
<!--    <sport-ball ref="ball" class="sport-ball"></sport-ball>-->
  </div>
</template>

<script>

export default {
name: "DetailBottomBar",
  methods: {
    addToCart(){
      /*console.log('添加id,数量,价格...到购物车')*/
      this.$emit('addCart')
    }
  }
}
</script>

<style scoped>

  .bottom-bat {
    position: fixed;/*生成绝对定位的元素，相对于浏览器窗口进行定位。 元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。*/
    height: 49px;
    background-color: #fff;
    left: 0;
    right: 0;
    bottom: 0;



    display: flex;/*将对象作为内联块级弹性伸缩盒显示*/
    text-align: center;/*text-align 属性规定元素中的文本的水平对齐方式*/
  }

.bar-item {/*这里有两个样式:bar-item 和 bar-left,当bar-item bar-left时对bar-left有效,而其他的对bar-item有效*/
  flex: 1;/*!flex:1就是代表均匀分配元素*/
  display: flex;/*将对象作为内联块级弹性伸缩盒显示*/
}

.bar-item > div {/*.bar-item > div,就是表示选择父元素为 .bar-item 元素的所有 div 元素。*/
  flex: 1;/*flex:1就是代表均匀分配元素*/
}

.bar-left .text {/*选择器空格隔开，应用于.bar-left类下的.text类后代元素*/
  font-size: 13px;
}

.bar-left .icon {/*选择器空格隔开，应用于.bar-left类下的.icon类后代元素*/
  /*css中的display是设置元素显示的方式,
  block是一块状元素的方式显示，
  inline是以内联元素的方式显示，
  none是不不显示；
  块状元素会单独占据一样，其他元素跟他在同一行的会被迫换行，挤到下一行那里去，inline则不会这样*/
  display: block;
  width: 22px;
  height: 22px;
  margin: 10px auto 3px;
  background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
}

.bar-left .service {/*选择器空格隔开，应用于.bar-left类下的.service类后代元素*/
  background-position: 0 -54px;/*background-position 属性设置背景图像的起始位置。 x,y) x表示向右 y表示向下*/
}

.bar-left .shop {/*选择器空格隔开，应用于.bar-left类下的.shop类后代元素*/
  background-position: 0 -98px;/*background-position 属性设置背景图像的起始位置。 x,y) x表示向右 y表示向下*/
}

.bar-right {
  font-size: 15px;
  color: #fff;
  line-height: 58px;
}

  .bar-right .cart {/*选择器空格隔开，应用于.bar-right类下的.cart类后代元素*/
    background-color: #ffe817;
    color: #333;
  }

  .bar-right .buy {/*空格分隔：表示从属包含关系，是当前的元素子元素才会出现效果，即父子关系.选择器空格隔开，应用于.bar-right类下的.buy类后代元素*/
    background-color: #f69;
  }
</style>
<!--样式中两选择器的关系:
1. 连写：就是需要同时具备才会出现效果
2. 逗号分隔：就是只需要具备其中之一即可出现效果，二者是并列关系
3. 空格分隔：就是二者是父子关系，是当前的元素子元素才会出现效果-->

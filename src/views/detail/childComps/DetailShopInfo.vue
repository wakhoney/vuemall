<template>
  <div class="shop-info" v-if="Object.keys(shop).length !==0">

    <div class="shop-top">
      <img :src="shop.logo">
      <span class="title">{{shop.name}}</span>
    </div>


    <div class="shop-middle">
      <div class="shop-middle-item shop-middle-left">

        <div class="info-sells">
          <div class="sells-count">

<!--            无论是在Linux中写Bash脚本还是在Window上写PowerShell，管道符”|“是一个非常有用的工具。
            它提供了将前一个命令的输出作为下一个命令的输入的功能。在数据处理中，我们也可以使用管道符对数据进行各种操作。-->
            {{shop.sells | sellCountFilter}}
          </div>
          <div class="sells-text">总销量</div>
        </div>

        <div class="info-goods">
          <div class="goods-count">
            {{shop.goodsCount}}
          </div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>


      <div class="shop-middle-item shop-middle-right">
        <table>
          <tr v-for="(item, index) in shop.score" :key="index">
            <td>{{item.name}}</td>
            <td class="score" :class="{'score-better': item.isBetter}">{{item.score}}</td>
            <td class="better" :class="{'better-more': item.isBetter}"><span>{{item.isBetter ? '高':'低'}}</span></td>
          </tr>
        </table>
      </div>


    </div>
      <div class="shop-bottom">
        <div class="enter-shop">进店逛逛</div>
      </div>
    </div>

</template>

<script>
	export default {
		name: "DetailShopInfo",
    props: {
		  shop: {
		    type: Object,
        default(){
		      return{}
        }
      }
    },
    filters: {
      sellCountFilter: function (value) {
        if (value < 10000) return value;
        return (value/10000).toFixed(1) + '万'/*oFixed() 方法可把 Number 四舍五入为指定小数位数的数字。*/
      }
    }

	}
</script>

<style scoped>
  .shop-info {
    padding: 25px 8px;
    border-bottom: 5px solid #f2f5f8;
  }
  .shop-top {
    line-height: 45px;
    /* 让元素垂直中心对齐 */
    display: flex;
    align-items: center;
  }
  .shop-top img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: 1px solid rgba(0,0,0,.1);
  }
  .shop-top .title {
    margin-left: 10px;
    vertical-align: center;
  }
  .shop-middle {
    margin-top: 15px;
    display: flex;
    align-items: center;
  }
  .shop-middle-item {
    flex: 1;/*所有元素有相等长度*/
  }
  .shop-middle-left {
    display: flex;/*Flex 是 Flexible Box 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。*/

    /*justify-content 用于设置或检索弹性盒子元素在主轴（横轴）方向上的对齐方式。
    space-evenly，flex 元素之间和 flex 元素和容器的空间总是相等的*/
    justify-content: space-evenly;

    color: #333;
    text-align: center;
    border-right: 1px solid rgba(0,0,0,.1);
  }
  .sells-count, .goods-count {
    font-size: 18px;
  }
  .sells-text, .goods-text {
    margin-top: 10px;
    font-size: 12px;
  }
  .shop-middle-right {
    font-size: 13px;
    color: #333;
  }
  .shop-middle-right table {
    width: 120px;
    margin-left: 30px;
  }
  .shop-middle-right table td {
    padding: 5px 0;
  }
  .shop-middle-right .score {
    color: #5ea732;
  }
  .shop-middle-right .score-better {
    color: #f13e3a;
  }
  .shop-middle-right .better span {
    background-color: #5ea732;
    color: #fff;
    text-align: center;
  }
  .shop-middle-right .better-more span {
    background-color: #f13e3a;
  }
  .shop-bottom {
    text-align: center;
    margin-top: 10px;
  }
  .enter-shop {
    display: inline-block;
    font-size: 14px;
    background-color: #f2f5f8;
    width: 150px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 10px;
  }
</style>

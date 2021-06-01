<template>
  <div class="bottom-bar">

    <div class="check-content">
      <check-button class="check-button" :is-check="isSelectAll" @click.native="cc"/>
      <span>全选</span>
    </div>

    <div class="price">
      合计: {{totalprice}}
    </div>

    <div class="calculate" @click="cartclick">
      去支付
    </div>

  </div>
</template>

<script>
import CheckButton from "views/detail/childComps/CheckButton";
import {mapGetters} from 'vuex'/*在组件中引入mapGetters就是将vuex中的数据映射到组件的计算属性当中，在组件不多，组件的数据通信不是很多的时候这样写看似将简单的东西复杂化了，但是在稍复杂点的项目中这样会极大的减少工作量，及组件之间数据传递的复杂程度。*/

export default {
name: "CartBottomBar",

  components: {
  CheckButton
  },
  computed: {
  ...mapGetters(['cartList']),
    totalprice(){
    let c = null
      /*filter(必须。函数，数组中的每个元素都会执行这个函数函数参数)*/
      return '$:'+ this.$store.state.cartList.filter( item => /*把每个数经过这个函数的都通过 item 就是箭头函数的形式参数,条件是item.checked*/
         item.checked
      ).reduce((preValue,item) =>{/*preValue前一个值; reduce 为数组中的每一个元素依次执行回调函数*/

        c += item.nowprice * item.count
        /*return item.nowprice * item.count*/
        return c
        /*总结:
        * 首先不明白这函数就用了很多的方法来取值,
        * 然后知道后,我确定我到这里时我有了什么条件,
        * 最后我确定并优化逻辑得到了想要的结果*/
      },0)//注意这里设置了初始值

    },
    checkLength(){
      return this.$store.state.cartList.filter(item =>item.checked).length
    },
    isSelectAll(){
    /*if(this.cartList.length==0)return false
    /!*这里用filter()来遍历,从数组中找没有被选中的,然后item就有长度了,只要有一个选中就是true*!/
      return !(this.$store.state.cartList.filter(item => !item.checked).length)*/
      if(this.cartList.length==0)return false

      for (let item of this.cartList){/*item.checked表示选中*/
        if(!item.checked){/* ！是非运算符号，比如a为真，则！a则为假。a如果为假，则！a为真。 */
          return  false
        }
      }
      return true
    }
  },methods: {
    cc(){
      /*我点击时要不全选要不全不选*/
      console.log('我是大笨蛋!')
      /*1. this.cartList.checked = false 这样不行,vuex中修改数据需要通过mutations*/
      /*2. this.$store.dispatch()这样又不合理了,购物车存在的就是true,我改值就是他偷东西了*/
      for (let item of this.cartList){/*item.checked表示选中*/
        item.checked = !item.checked
      }
    },
    cartclick(){
      if(!this.isSelectAll){
        this.$toast.show('请选择购买的商品',1500)
      }
    }
  }
}
</script>

<style scoped>

  .bottom-bar {
    display: flex;/*它的所有子元素自动成为容器成员*/
    position: relative;
    height: 40px;
    background-color:#eee;
    line-height: 40px;/*行高;原始数字值指定了一个缩放因子，后代元素会继承这个缩放因子而不是计算值。*/
  }

  .check-content {
    display: flex;/*它的所有子元素自动成为容器成员*/
    align-items: center;/*居中对齐弹性盒的各项 <div> 元素*/
    margin-left: 10px;
    width: 60px;
  }

  .check-button {
    height: 20px;
    width: 20px;
    line-height: 20px;
    margin-right: 5px;
  }

  .price {
    margin-left: 20px;
    flex: 1;
  }

  .calculate {
    width: 60px;
    background-color: coral;
    text-align: center;
  }
</style>

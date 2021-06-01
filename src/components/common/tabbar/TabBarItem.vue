<template>
  <div class="tab-bar-item" v-on:click="itemclick">
    <div v-if="!isactive"><slot name="item-icon"></slot><!--因为组件定义的不是固定的东西,所以需要用插槽--></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activestyle"><slot name="item-text"></slot></div>
  </div>
</template>
<script>
export default {
  name: "TabBarItem",
  props: {/*这里是因为传值时用的是字符串,所以不用绑定属性v-bing,通过属性传过来的不是绑定,并用props获取的*/
    path: String,
    activeColor:{/*props传过来的可以是数组,也可以是对象,定义为对象时放便限制和给默认值*/
      type:String,
      default: 'red'
    }
  },
  data() {/*这里为啥是函数?因为函数每次返回一个新的对象,有自己的作用域,当我们多次使用实例对象时得到不同数据,避免了全局变量共享问题*/
    return {
      /*isactive: true这里不能写死,不然一直是活跃状态,怎么办呢?搞个计算属性*/
    }
  },
  methods: {
    itemclick() {
      this.$router.replace(this.path).catch(err=> {})
    }
  },
  computed:{/*如果直接把this.$route.path.indexOf(this.path)!== -1放在对应处太过于复杂了,所以可以通过计算属性*/
    isactive() {
      return this.$route.path.indexOf(this.path) !== -1 /*indexOf方法是不等于-1就是找到了*/
    },
    activestyle() {
      return this.isactive ? {color: this.activecolor} :{}
    }
  }
}
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;/*均等分*/
    text-align: center;
    height: 49px;
    font-size: 14px;
    margin-top: 3px;
    vertical-align: middle;/*图片基于基线对齐,而不是中线*/
    margin-bottom: 2px;

  }

  .tab-bar-item img {
    width: 24px;
    height: 24px;
  }

  /*.active{
    color: red;
  }这样写太固定了,封装不彻底*/

</style>

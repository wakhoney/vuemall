<template>
  <div class="tab-control">
    <!--因为是数组,所以遍历就可以了,简化了一个一个写,遍历后每个都一样-->
    <div v-for="(item,index) in titles" class="tab-control-item"
         :class="{active: index===currentIndex}" @click="itemClick(index)"><!--我们可以传给 v-bind:class 一个对象，以动态地切换 class：-->
      <span>{{item}}</span>
<!--      ES6支持对象属性为变量，的写法：
      var a = 'x'
      var b = 'y'
      var obj = {
      [a]: 'this is x',
      [b]: 'this is y',
      }
      console.log(obj)-->
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  /*如果只有文字不一样就没必要搞插槽了,通过props传进来就可以了*/
  props: {
    titles:{
    type: Array,
    default: function (){
      return[]
    }
    }
  },
  data(){
    return {
      currentIndex: 0  /*定义一个变量来记录下谁处于选中*/
    }
  },
  methods: {
    itemClick(index){/*上面:class对象属性有个判断:正确就显示,运行第一个是显示的,然后点击时把index传出去,并在methods中把传进来的index=currentIndex*/
      this.currentIndex = index;
      this.$emit('tabClick',index)
    }
  }
}
</script>

<style scoped>

  .tab-control {
    display: flex;
    text-align: center;
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }

  .tab-control-item {
    flex: 1;

  }

  .active {/*这里的active表示:class="tab-control-item"*/
    color: var(--color-high-text);
  }

  .active span {/*这里表示class="tab-control-item"下的<span/>*/
    border-bottom: 3px solid var(--color-tint);/*border-bottom表示下边框thin（细线）；边框线的类型：solid（实线）；边框线的颜色：red（红色）*/
    padding: 5px;
  }
</style>

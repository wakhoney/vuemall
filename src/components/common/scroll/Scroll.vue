<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: "Scroll",
  props:{
    probeType:{
      type: Number,
      default:0/*0是不监听滚动状态的,所以要监听滚动的时候要传个值进来,不要默认值*/
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return{
    scroll: null
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper,{
      click: true,/*这里设置成true,那div的东西就可以点击了*/
      probeType: this.probeType,/*probeType: 1：滚动的时候会派发scroll事件，会截流。*/
      pullUpLoad: this.pullUpLoad/*pullUpLoad选项,用来配置上拉加载功能。*/
    });

    /*监听滚动位置*/
    if(this.probeType===2 || this.probeType ===3){/*价格判断更有逼格*/
      this.scroll.on('scroll',(position)=>{
        /*console.log(position)位置信息;*/
        this.$emit('scroll',position)
      });
    }


    /*监听底部滚动*/
    if (this.pullUpLoad){
      this.scroll.on('pullingUp',()=>{/*价格判断更有逼格*/
        /*console.log('我到底部了');*/
        this.$emit('pullingUp')
      })
    }

  },
  methods: {

    scrollTo(x, y, time=300){/*scrollTo(x,y) 方法可把内容滚动到指定的坐标。*/
      this.scroll && this.scroll.scrollTo(x,y,time)/*&&逻辑与,当两边都有值为true时继续执行*/
    },

    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()/*逻辑运算符短路与;判断是否有数据,并调用finishPullUp*/
    },
    refresh() {
      console.log('防抖函数---我刷新了');
      this.scroll && this.scroll.refresh();
    },
    getscrollY(){
      return this.scroll ? this.scroll.y : 0 /*有值返回一个值,没值返回一个0*/
    }
  }
}
</script>

<style scoped>

</style>

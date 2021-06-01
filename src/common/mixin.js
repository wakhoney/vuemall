import {debounce} from "common/util";
import BackTop from "components/content/backTop/BackTop";

export const itemListenerMixin = {
  data(){
    return{
      itemImgListener: null,
      newRefresh: null
    }
  },
  mounted(){/*因为这是个函数有闭包问题,所以定义个值保存起来,每次用都是原来的值;若不保存,每次都是新的对象*/
    this.newRefresh =debounce(this.$refs.scroll.refresh,500)/*func等会要执行的函数;delay给个时间等多久,delay可以省略*/

    this.itemImgListener = ()=>{
      this.newRefresh()
    }

    this.$bus.$on('itemImgageLoad',this.itemImgListener)
    console.log('我是混入中的mixin负责监听');
  }
}

export const backTopMixin = {
  components:{
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backClick(){
      this.$refs.scroll.scrollTo(0,0,100)
    },
    listenShowBackTop(position){
      this.isShowBacktop = (-position.y) > 1000
    }
  }

}

/*
对于mixin的抽离:
1. 如果是生命周期里的函数,可以抽到这里写也可以在组件里写.
2. 函数如:data(),methods()在mixin抽离的会加入到组件里的data(),methods()中,但存在函数名一样的不会合并,会覆盖
3. 如果想省略空间,就把data(),methods()函数里的代码写个函数调用就可以了
*/

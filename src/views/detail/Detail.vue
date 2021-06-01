<template>
  <div class="detail">

    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>

    <Scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">

      <detail-swiper :topImages = "topImages"></detail-swiper><!--标签不区分大小写,但收到监听东西必须遵循驼峰,不然找不到-->

      <detail-base-info :goods = "goods"></detail-base-info>

      <detail-shop-info :shop = "shop"></detail-shop-info>

      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>

      <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>

      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>

      <goods-list ref="recommend" :goods="recommends"></goods-list>

    </Scroll>

    <detail-bottom-bar @addCart="addCart"/>

    <!--.native - 监听组件根元素的原生事件。主要是给自定义的组件添加原生事件。-->
    <back-top v-on:click.native="backClick" v-show="isShowBacktop"></back-top>

    <!--因为传值和是否要显示都不是固定的,所以需要动态绑定-->

  </div>
</template>

<script>
import DetailNavBar from "views/detail/childComps/DetailNavBar";
import DetailSwiper from "views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "views/detail/childComps/DetailShopInfo";
import DetailGoodsInfo from "views/detail/childComps/DetailGoodsInfo";
import DetailParamInfo from "views/detail/childComps/DetailParamInfo";
import DetailCommentInfo from "views/detail/childComps/DetailCommentInfo";
import GoodsList from "components/content/goods/GoodsList";
import DetailBottomBar from "views/detail/childComps/DetailBottomBar";



import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail";
import Scroll from "components/common/scroll/Scroll";
import {itemListenerMixin, backTopMixin} from 'common/mixin'
import {debounce} from "common/util";
/*把vuex中actions的方法映射到组件中*/
import {mapActions} from 'vuex'

export default {
name: "Detail",
  components: {
    DetailParamInfo,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,

  },
  mixins: [itemListenerMixin, backTopMixin]
  ,
  data(){
  return{
    /*保存id*/
    iid: null,
    topImages: [],
    goods: {},
    shop: {},
    detailInfo: {},
    paramInfo: {},
    commentInfo: {},
    recommends: [],/*这里有个关于数组的秘密:数组有索引值,所以是有序排列的*/
    themeTopYs: [],
    getThemeTopY: null,/*明面上是保存值,实际是是把请求来的在scrollTo()中所需要的y值(复数)保存下来*/
    currentIndex: 0,
    isShowBacktop: false,

  }
  },
 methods: {
  ...mapActions(/*['addCart']*/{ add : 'addCart'}),/*这里表示映射到了这里了*/

   imageLoad(){
      this.$refs.scroll.refresh()
     this.getThemeTopY()/*这里是函数对应created()里的this.getThemeTopY()*/
   },
   titleClick(index){/*那三个按钮的索引值*/
     this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100)
     console.log(-this.themeTopYs[index]+'+++++++++++++++++++')
   },

   contentScroll(position){/*position是位置信息*/
     /*1.监听scroll,emit()获取滚动到的y值*/
    const positoinY = -position.y

    /* console.log(positoinY);0, 1, 2, 3*/

     /*把滚动的值和themeTopYs中的值进行对比*/

     /*themeTopYs中的值[0, 7938, 9120, 9452]
     positoinY 在 0 和7938 之间 ,index=0
     positoinY 在 7938 和 9120 之间 ,index=1
     positoinY 在 9120 和 9452 之间 ,index=2

     positoinY 在 大于9452 ,index=3*/

     /*遍历themeTopYs[]*/
     /*let length = this.themeTopYs.length
     for (let i = 0; i < length; i++){/!*遍历得到索引值 i *!/
       /!*console.log(i);*!/
       /!*每次都有数据 i---索引值,themeTopYs[i]表示里面的每一项,因为是数组,所以是有序的*!/
       /!*这里我理解难的是: 1. &&的过滤, 2. for循环里有if,所以如果i不符合条件,if还需判断,而不是终止全部*!/
       if ( this.currentIndex !== i &&  (i < length - 1 && positoinY >= this.themeTopYs[i] && positoinY <
         this.themeTopYs[i+1]) || (i === length - 1 && positoinY >= this.themeTopYs[i]) ){
         /!*!== 比较两个操作数的值是否不相等，同时检测它们的类型是否不相同*!/
         /!*var num = 1;
         var test = 1;
         test !== num //false test与num类型相同，其值也相同,　非运算肯定是false *!/

         this.currentIndex = i;
         console.log(this.currentIndex + '6666666');
         this.$refs.nav.currentIndex = this.currentIndex
       }
     }下面简化*/
     let length = this.themeTopYs.length - 1;
     for( let i = 0; i < length; i++){
       if( this.currentIndex !== i && (positoinY >= this.themeTopYs[i] && positoinY < this.themeTopYs[i+1])){
         this.currentIndex = i;
         this.$refs.nav.currentIndex = this.currentIndex;
       }
     }

     /*this.isShowBacktop = (-position.y) > 1000*/
     this.listenShowBackTop(position)
   },
   addCart(){
     /*1. 获取购物车需要展示的信息*/
     const product = {}
     product.image = this.topImages[0];
     product.title = this.goods.title;
     product.desc = this.goods.desc;
     product.price = this.goods.newPrice;
     product.iid = this.iid;
     product.nowprice = this.goods.realPrice

     /*2. 将商品添加到购物车里*/
     /*this.$store.cartList.push(product)这种方式是不对的,所有要修改store里的数据都要通过mutations*/
     /*this.$store.commit('addCart',product)多逻辑时应该在actions*/

     /*看看下面mapActions的映射简化*/
     /*this.$store.dispatch('addCart',product).then(res=>{//promise很重要在es6
       console.log(res+'kkkkkkkkkkkkkkkkkkkkkkk')
     })*/
     this.add(product).then(res => {//promise很重要在es6
        this.$toast.show(res,1500)
     })

     /*这里怎么表示添加商品成功?因为vuex的actions是异步的,所以用promise封装,这里就有个then了*/
   }
 }
 ,

  created() {
    /*获取id*/
    this.iid = this.$route.params.iid

    /*通过id获取数据*/
    getDetail(this.iid).then(res=>{
      console.log(res);

      const data = res.result/*做个中转,意义简化代码*/

      this.topImages = data.itemInfo.topImages

      /*获取商品信息*/
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      /*创建店铺信息*/
      this.shop = new Shop(data.shopInfo)

      /*保存商品详情数据*/
      this.detailInfo = data.detailInfo;

      /*获取参数信息*/
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      /*取出评论信息*/
      /*因为有些有,有些没有,所以做个判断*/
      if (data.rate.cRate !==0){
        this.commentInfo = data.rate.list[0]/*这里要看返回的类型是什么来判断用时的接收类型*/
      }

      /*请求推荐数据*/
      getRecommend().then(res=>{
        this.recommends = res.data.list
      })
      /*根据最新的数据,对应的DOM是已经被渲染出来了,但图片依然是没有加载完(目前获取到offsetTop不包含图片的)*/
      this.getThemeTopY = debounce(()=>{

        /*1. offsetTop：元素到offsetParent顶部的距离
        2. offsetParent：距离元素最近的一个具有定位的祖宗元素（relative，absolute，fixed），若祖宗都不符合条件，offsetParent为body。*/
        this.$nextTick(()=>{/*nextTick(): 这个函数会等Dom渲染完后调用里面的参数函数*/
          /*这里通过ref拿到组件对象,再根据$el拿到Vue实例关联的DOM元素,从而拿到元素到顶部的距离并加入到数组变量中*/
          this.themeTopYs.push(0);
          this.themeTopYs.push(this.$refs.params.$el.offsetTop);/*$el获取Vue实例关联的DOM元素*/
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop);/*$el获取Vue实例关联的DOM元素*/
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);/*$el获取Vue实例关联的DOM元素*/
          this.themeTopYs.push(Number.MAX_VALUE)/*添加一个最大值*/
          /*console.log(this.themeTopYs+'++++++++++++++++++++++++++++++');*/
        },1000)
      })

    })




  },
 /* 混合素是分配 Vue 组件可重复使用的功能的灵活方法。混合对象可以包含任何组件选项。当组件使用混音时，
 混合素中的所有选项都将"混合"到组件自己的选项中。*/
  mounted() {
    /*1. offsetTop：元素到offsetParent顶部的距离
    2. offsetParent：距离元素最近的一个具有定位的祖宗元素（relative，absolute，fixed），若祖宗都不符合条件，offsetParent为body。*/



  },
/*updated() {
    this.themeTopYs = []
  this.themeTopYs.push(0);
  this.themeTopYs.push(this.$refs.params.$el.offsetTop);
  this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
  this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
},*/

  destroyed(){
      this.$bus.$off('itemImgageLoad',this.itemImgListener)
    console.log('我是detail里的销毁,离开时我要关闭监听');
  }




}
</script>

<style scoped>
  .detail {
    position: relative;/*position 属性规定元素的定位类型。*/
    z-index: 9;
    background-color: #f6f6f6;
    height: 100vh;
  }

  .content {
    height: calc(100% - 44px - 49px);/*注意:这里的百分之一百是相对父元素,所以给个视窗*/
  }

  .detail-nav {
    position: relative;/*position 属性规定元素的定位类型。*/
    z-index: 1;
    background-color: #f6f6f6;
  }
</style>

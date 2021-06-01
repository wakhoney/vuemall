<template>
  <div id="home">

    <nav-bar class="home-nva">
      <div slot="center">购物街</div>
    </nav-bar>

<!--    这里做个视觉假象,默认是不显示的,当属性高度大于本身高度时显示-->
    <tab-control class="tab-control" :titles="['流行','新款','精选']" v-on:tabClick="tabClick" ref="tabControl1" v-show="isTanFoxed"/>

    <scroll class="content" ref="scroll"
            :probe-type="3" @scroll="contentScroll"
            :pull-up-load="true" @pullingUp="loadMore">

     <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
     <!--只要是一个独立的东西就会抽一个库,这里只做主要逻辑-->

     <recommend-view :recommends="recommends" />

     <feature-view />

     <tab-control class="tab-control" :titles="['流行','新款','精选']" v-on:tabClick="tabClick" ref="tabControl2"/>

     <goods-list :goods="goods[currentType].list" />

    </scroll>
    <!--.native - 监听组件根元素的原生事件。主要是给自定义的组件添加原生事件。-->
    <back-top v-on:click.native="backClick" v-show="isShowBacktop"></back-top>

  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';
import {getHomeMultidata,getHomeGoods} from "network/home";
import HomeSwiper from 'views/home/childComps/HomeSwiper'
import RecommendView from 'views/home/childComps/RecommendView';
import FeatureView from 'views/home/childComps/FeatureView'
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import {itemListenerMixin, backTopMixin} from "common/mixin"

export default {
  name: "Home",
  components: {
    RecommendView,
    NavBar,
    HomeSwiper,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,

  },
  mixins: [itemListenerMixin, backTopMixin],

  data(){
    /*重点*/
    /*下面函数调用后为什么要保存:
    函数调用->压入函数栈(保存函数调用过程中所有变量)
    函数调用结束->弹出函数栈(函数释放所有变量)*/
    return {
      banners:  [],
      recommends: [],/*垃圾回收机制:当引用没有指向时*/

      /*这里是数据储存解构*/
      goods: {
        'pop' : {page: 0, list: []},
        'new' : {page: 0, list: []},
        'sell' : {page: 0, list: []},
      },

      currentType:'pop',
      isShowBacktop: false,
      tabOffsetTop: 0,
      isTanFoxed: false,
      saveY: 0
    }
  },

  /*keep-alive有缓存的,然后伴随他的有两个钩子函数:activated()和deactivated()*/
  activated() {
    this.$refs.scroll.scrollTo(0,this.saveY,0);
    this.$refs.scroll.refresh()
  },
  deactivated() {
    /*保存y坐标*/
    this.saveY = this.$refs.scroll.getscrollY()

    //取消全局事件的监听
    console.log('我是home,我有keep-alive,所以我有deactivated方法,离开当前界面我就取消监听');
    this.$bus.$off('itemImgageLoad',this.itemImgListener)//this.$bus.$off是取消事件,如果没跟函数就表示取消全部,跟这就表示取消指定
  },

  created() {
    /*函数有自己的作用域,created()指向Home组件对象,所有这this指向Home组件*/
    /*getHomeMultidata().then(res=>{
      console.log(res);
      this.banners = res.data.banner.list//程序执行顺序:上到下,右到左
      this.recommends = res.data.recommend.list;/!*变量指向对象就不会被垃圾回收器回收了--用变量保存对象*!/
    }),*/

      /*getHomeGoods('pop',1).then(res=>{
        console.log(res);
      })*/

        //上面的简化
        //请求多个数据
        this.getHomeMultidata(),

        //请求商品数据
        this.getHomeGoods('pop'),
        this.getHomeGoods('new'),
        this.getHomeGoods('sell')/*这里是调用metheds里的方法去传惨,created这钩子函数最好写主要业务代码*/

  },
  mounted() {
    /*不同默认导出对象的相同代码太耦合了,用混入就可以省略两处地方不写了*/

/*图片加载完成的事件监听*/
    /*所以增加 括号，会导致立刻运算，进而返回结果；不加括号，只是将 函数 作为 对象，赋值给变量而已。*/
/*const refresh =debounce(this.$refs.scroll.refresh,500)*//*func等会要执行的函数;delay给个时间等多久,delay可以省略*/
    /*监听item中图片加载完成,因为一滑动就监听,所以最后写在created钩子函数里*/

   /* Mixin 钩子按照传入顺序依次调用,并在调用组件自身的钩子之前被调用.*/

  /*  this.itemImgListener = ()=>{
      refresh()
    }
    this.$bus.$on('itemImgageLoad',this.itemImgListener)*/

  },
  methods: {
    /*网络请求方法*/
    getHomeMultidata(){
      getHomeMultidata().then(res=>{
        this.banners = res.data.banner.list//程序执行顺序:上到下,右到左
        this.recommends = res.data.recommend.list;/*变量指向对象就不会被垃圾回收器回收了--用变量保存对象*/
      })
    },

    getHomeGoods(type){
      const page = this.goods[type].page + 1/*拿到页数,起始页为0,这里设置为1,后面做上拉时,就原始页+1*/
      getHomeGoods(type,page).then(res => {/*这里是调用home.js里的方法*/
      /*...res是可变参数,会依此从res解析出来放到需要push的里面去*/
        /*this.goods[type].list.push(...res.data.list)*/
        /*除了上面这种,还可以用for循环*/
        for(let i of res.data.list){
          this.goods[type].list.push(i)
        }

        /*pullingUp: 监听的应该是，元素滚动过程中，被滚动的那个元素的底边与父级外框底边的距离，如果达到某个值，就执行其回调函数；
      finishPullUp: 这个类似控制一个开关，比如在触发pullingUp事件的时候，插件肯定会把一个开关给关掉，防止用户重复上拉
      在数据加载完成以后，需要执行finishPullUp()把开关打开，以便下次可以继续执行上拉刷新；
      refresh：其实就是重新计算一下内容的高度和宽度，也许也会计算外框的高度和宽度，因为dom结构发生了变化了，所以宽高要从新计算
      以为整个插件基本上都是在计算一些距离差值，所以肯定需要从新计算的；*/
        this.$refs.scroll.finishPullUp()
        this.goods[type].page += 1

      })
    },

    /*事件监听相关的*/
    tabClick(index){
      switch (index){
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;

    },

    contentScroll(position){
      /*console.log(position);*/
      /*判断BackTop是否显示*/
      this.listenShowBackTop(position),

      /*决定tabControl是否吸顶(position: fixed)*/
        this.isTanFoxed = (-position.y) > this.tabOffsetTop
    },


    /*上拉加载更多*/
    loadMore(){
      console.log('上拉加载更多');
      this.getHomeGoods(this.currentType)/*为哪个类型要加载更多*/

      this.$refs.scroll.scroll.refresh()/*重新计算可滚动高度*/
    },

    swiperImageLoad() {
      /*所有的组件都有一个属性$el: 用于获取组件中的属性*/
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop

    }

  }
}
</script>

<style scoped>/*scoped是作用域的意思,就是在当前组件起效果,其他组件有同样的样式名不影响这里的样式名*/

  #home {
   /* padding-top: 44px;*/
        /*在电脑图形学里面，视口代表了一个可看见的多边形区域（通常来说是矩形）。
    在浏览器范畴里，它代表的是浏览器中网站可见内容的部分。视口外的内容在被滚动进来前都是不可见的。*/
    height: 100vh;
    position: relative;
  }

  .home-nva {
    background-color: var(--color-tint);
    color: #f6f6f6;
    /*position: fixed;//在没给better-scroll管理时,用原生是所以需要fixed脱标
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;!*z-index 属性设置元素的堆叠顺序*!
    */

  }

  /*.tab-control {这是原生的,但用了better-scroll后就不起效果了
    position: sticky;!*在哪里设定粘性定位,粘性定位的元素是依赖于用户的滚动，在 position:relative 与 position:fixed 定位之间切换*!
    top: 44px;
    z-index: 8;
  }*/

  .content {
    /*height: 300px;*/
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0px;
    right: 0px;
  }
  /*.content {//动态计算
    height: calc(100% - 93px);
    background-color: red;
    overflow: hidden;
    padding-top: 44px;
  }*/

.tab-control {
  position: relative;
  z-index: 9; /*z-index只对定位元素起效果;*/
}

</style>

module.exports = {
  configureWebpack: {//configureWebpack:如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。
    resolve:{//解决路径问题
      alias:{//这里配置src下的别名,方便我们解决路径问题
        /*'@' : src'默认已经配置这个别名了,不需要重复配置*/
        'assets' : '@/assets',
        'common' : '@/common',
        'components' : '@/components',
        'network' : '@/network',
        'views' : '@/views',
      }
    }

  }
}

/*
width：100%；
height：100%
百分比的高和宽是相对于父元素而言的，而vw和vh是相对于视口（viewport）而言的

vw（视口宽度）
vh（视口高度）

vw	1vw = 视口宽度的1%
vh	1vh = 视口高度的1%
*/

/*px2vw--------css单位转换插件给移动端做适配,任何分辨率下等量缩放比*/
module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport" : {
      viewportWidth: 375,//视窗的宽度,对应的是我们设计稿的宽度
      viewportHeight: 667,//视窗的高度,对应的是我们设计稿的高度
      unitPrecision: 5,//指定'px'转换为视窗单位值的小数位数(很多时候无法整除)
      viewportUnit: 'vw',//指定需要转换成视窗单位,建议使用vw
      selectorBlackList: ['ignore', 'bottom-bat','check-content'],//不用转换的css中的class .tab-bar等开头的class选择器,或者在选择器中有ignore自定义

      minPixelValue: 1,//小于或等于'1px'不转换为视窗单位
      mediaQuery: false,//允许在媒体查询中转换'px'
      /*exclude: [/TabBar/]//不包括哪个文件*/
    }
  }
}

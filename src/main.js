import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from "./store";

/*移动端300毫秒延迟解决方案---fastclick*/
import FastClick from 'fastclick'

/*图片懒加载vue-lazyload*/
import VueLazyload from "vue-lazyload";

import toast from "components/common/toast";/*默认会去找下面的index文件.这里如果导出是default就可以随便改名了*/

/*vue要注意一个特别问题:这个基础模板可以根据vue生命周期顺序瞬间创建好,但是里面的数据等不是瞬间的,可能异步或图片太多太大等*/
Vue.config.productionTip = false
/*prototype 属性使您有能力向对象添加属性和方法*/
Vue.prototype.$bus = new Vue()/*vue实例可以作为我们事件总线*/

/*安装自定义插件*/
Vue.use(toast)

/*移动端300毫秒延迟解决方案---fastclick*/
/*1. 安装,2. 导入,3. FastClick.attach(document.body)*/
FastClick.attach(document.body)/*attach附加的意思*/

/*1. 安装, 2. 导入, 3.Vue.use(), 4. img: src -->v-lazy */
Vue.use(VueLazyload, {
  loading: require('assets/img/own/pubg.jpg')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

/*
事件循环:setTimeout是异步函数,若没给定延迟时间,它的执行也会加入到下一次事件的尾部执行
console.log('aaa');

setTimeout(()=>{
  console.log('bbb');
})

console.log('ccc');

顺序:aaa ccc bbb
*/

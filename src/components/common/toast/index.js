      /*为啥用插件封装组件:
      但在实际开发过程中，有一些组件会在多个地方频繁使用，并且组件还有一些自己的方法，
如果使用常规方法来使用这些组件，不仅要完成上面三个步骤，还需要在封装好的组件中 $emit
方法，并在使用组件的地方监听，这样使用起来十分复杂*/

import Toast from "components/common/toast/Toast";

const obj = {}/*var obj = {}; 只是一种简写方式，相当于 var obj = Object.create({});*/

/*Vue.use()时,默认执行括号里的install,并且默认传个Vue过来的*/
obj.install = function (Vue){/*给obj添加属性简易写法: 创建变量时赋值就可以了*/

  /*Vue以插件的方式封装一个组件*/
  /*1.创建组件构造器*/
  const toastContrustor = Vue.extend(Toast)

  /*2.new的方式,根据组件构造器,可以创建出来一个组件对象*/
  const toast = new toastContrustor()

  /*3.将组件对象, 手动挂载到某一个元素上*/
  toast.$mount(document.createElement('div'))

  /*4.toast.$el对应的就是上面3的div*/
  document.body.appendChild(toast.$el)/*$ref $el介绍挺好的 https://www.cnblogs.com/hope192168/p/11966104.html*/
  // 所有组件都有一个属性$el: 用于获取组件中的元素

  // 将组件对象放在Vue原型
  Vue.prototype.$toast = toast;
}

export default obj

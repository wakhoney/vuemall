<template>
  <div class="toast" v-show="show">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
name: "Toast",
  props: {/*组件封装后,可变的内容都应该由外面传进来*/
   /* message: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: false
    }*/

  },
  data(){
      return{
        message: '',
        isShow: false
      }
  },
  methods: {
  show( message = '默认文字',duration = 1500) {
    /*判断duration有没有值,没有就给个值
      duration = duration || 1500
    */
    this.isShow = true;
    this.message = message;

    setTimeout(() => {
      this.isShow = false;
      this.message = ''
    },duration)
  }
  }
}
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);/*ransform属性应用于元素的2D或3D转换。这个属性允许你将元素旋转，缩放，移动，倾斜等*/
    /*padding: 8px 10px;这种用空格间隔表示上下8和左右10*/
    z-index: 999;

    color: #fff;/*这是文字颜色*/
    background-color: rgba(0,0,0,.5);
  }
</style>

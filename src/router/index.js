import Vue from 'vue'
import VueRouter from 'vue-router'
/*import()返回一个 Promise 对象。*/
const Home =()=>import('views/home/Home');
const Category =()=>import('views/category/Category');
const Detail =()=>import('views/detail/Detail')

Vue.use(VueRouter)

const routes = [

  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },{
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: ()=> import('../views/cart/Cart')
  },
  {
    path: '/profile',
    component: ()=> import('../views/profile/Profile')
  },
  {
    path: '/detail/:iid',
    component:Detail
  }

]

const router =new VueRouter({
  routes,
  mode: "history"
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import User from './user'
import store from '@/store/index';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  ...User
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

function checkLocalStorage() {
  const luser = localStorage.getItem('user')
  if (luser && !(store.state as CStore).user.islogin) {
    (store.state as CStore).user = JSON.parse(luser)
  }
}

router.beforeEach(async (to, from, next) => {
  /* 读取变量 */
  var storeStr = sessionStorage.getItem("store");
  if (storeStr) {
    var storeS: CStore = JSON.parse(storeStr)
  } else {
    var storeS: CStore = store.state as CStore;
  }
  checkLocalStorage()

  /* Router 判断 */
  switch (to.meta.type) {
    case 'userpage':
      if (!to.meta.needlogin) {
        next()
        return
      };
      if (!storeS.user.islogin) {
        next('/user/login')
        return
      };
      next()
      return
    default:
      next()
  }
})

export default router

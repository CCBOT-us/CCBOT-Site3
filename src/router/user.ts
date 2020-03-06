const router = [
  {
    path: "/user",
    redirect: "/user/home"
  },
  {
    path: "/user/home",
    meta: {
      type: "userpage",
      layout: "userpage_base",
      needlogin: true
    },
    component: () => import('../views/user/dashboards/home.vue')
  },
  {
    path: "/user/login",
    meta: {
      type: "userpage",
      layout: "userpage_page",
      needlogin: false
    },
    component: () => import('../views/user/auth/login.vue')
  },
  {
    path: "/user/register",
    meta: {
      type: "userpage",
      layout: "userpage_page",
      needlogin: false
    },
    component: () => import('../views/user/auth/register.vue')
  },
  {
    path: "/user/TOS",
    meta: {
      type: "userpage",
      layout: "default",
      needlogin: false
    },
    component: () => import('../views/user/auth/TOS.vue')
  }
]

export default router

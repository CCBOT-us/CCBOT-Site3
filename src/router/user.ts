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
  }
]

export default router

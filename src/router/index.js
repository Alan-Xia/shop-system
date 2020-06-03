import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store'
Vue.use(VueRouter);

const routes = [
  { 
    path: '/', 
    redirect: '/home' 
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login/Login.vue')
  },
  {
    path: '/home',
    redirect: '/users',
    component: () => import('../views/Layout/Layout.vue'),
    children: [
      {
        path: '/users',
        name:'user',
        component: () => import('../views/User/index.vue')
      },
      {
        path: '/rights',
        name:'rights',
        component: () => import('../views/Power/Rights.vue')
      },
      {
        path: '/roles',
        name:'roles',
        component: () => import('../views/Power/Roles.vue')
      },
      {
        path: '/categories',
        name:'categories',
        component: () => import('../views/Shop/Cate.vue')
      },
      {
        path: '/goods',
        name:'goods',
        component: () => import('../views/Shop/Goods.vue')
      },
      {
        path: '/parmas',
        name:'parmas',
        component: () => import('../views/Shop/Params.vue')
      },
      {
        path: '/orders',
        name:'order',
        component: () => import('../views/Order/index.vue')
      },
      {
        path: '/reports',
        name:'reports',
        component: () => import('../views/Report/index.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next) => {
  if (!store.getters.token) {
    if (to.path == '/login') {
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.path}
      })
    }
  } else {
    next()
  }
})

export default router;

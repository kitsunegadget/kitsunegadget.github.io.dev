import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Main.vue'
 
Vue.use(Router)
 
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
    {
      path: '/product',
      name: 'product',
      component: () => import(/* webpackChunkName: "product" */ './views/Product.vue')
    },
    {
      path: '/illust',
      name: 'illust',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "illust" */ './views/Illust.vue')
    },
    {
      path: '/*',
      name: '404',
      component: () => import('./views/404.vue')
    }
  ]
})
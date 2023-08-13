import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import TestPage     from '@/views/TestPage.vue'
import MainPage     from '@/views/MainPage.vue'
import SignInTab from '@/views/tabs/SignInTab.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/test',
    name: 'test',
    component: TestPage
  },
  {
    path: '/',
    name: 'main',
    component: MainPage
  },
  {
    path: '/sign_in',
    name: 'signIn',
    component: SignInTab
  },
//   {
//     path: '/about',
//     name: 'about',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
//   }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

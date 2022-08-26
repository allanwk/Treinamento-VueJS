import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    alias: '/',
    name: 'home',
    component: () => import('@/views/HomeView'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView'),
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/DashboardView'),
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/views/SignupView'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router

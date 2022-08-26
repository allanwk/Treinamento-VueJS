import Vue from 'vue'
import VueRouter from 'vue-router'
import ModalView from '@/views/ModalView.vue'
import ListView from '@/views/ListView.vue'
import DrawerView from '@/views/DrawerView.vue'
import CardsView from '@/views/CardsView.vue'
import SimpleView from '@/views/SimpleView.vue'
import StaggerView from '@/views/StaggerView.vue'
import StateView from '@/views/StateView.vue'
import TimelineView from '@/views/TimelineView.vue'
import MasterView from '@/views/MasterView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: ModalView,
  },
  {
    path: '/list',
    name: 'list',
    component: ListView,
  },
  {
    path: '/drawer',
    name: 'drawer',
    component: DrawerView,
  },
  {
    path: '/cards',
    name: 'cards',
    component: CardsView,
  },
  {
    path: '/simple',
    name: 'simple',
    component: SimpleView,
  },
  {
    path: '/stagger',
    name: 'stagger',
    component: StaggerView,
  },
  {
    path: '/state',
    name: 'state',
    component: StateView,
  },
  {
    path: '/timeline',
    name: 'timeline',
    component: TimelineView,
  },
  {
    path: '/master',
    name: 'master',
    component: MasterView,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router

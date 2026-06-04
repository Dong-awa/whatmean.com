import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'
import Entry from '../views/Entry.vue'
import About from '../views/About.vue'
import Friends from '../views/Friends.vue'
import Freebies from '../views/Freebies.vue'
import EntryGenerator from '../views/EntryGenerator.vue'

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/entries',
    name: 'Entry',
    component: Entry
  },
  {
    path: '/entry-generator',
    name: 'EntryGenerator',
    component: EntryGenerator
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/friends',
    name: 'Friends',
    component: Friends
  },
  {
    path: '/freebies',
    name: 'Freebies',
    component: Freebies
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home.vue'
import Login from '../views/Login.vue'
import Timeline from '../views/timeline/Timeline.vue'
import Configuration from '../views/configuration/Configuration'
import Post from "../views/timeline/Post.vue"
import Change_name from "../views/configuration/Change_name"
import Change_img from "../views/configuration/Change_img"
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/timeline',
    name: 'timeline',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Timeline
  },
  {
    path: '/configuration',
    name: 'configuration',
    component: Configuration
  },
  {
    path: '/configuration/changename',
    name: 'changename',
    component: Change_name
  },
  {
    path: '/configuration/changeimg',
    name: 'changeimg',
    component: Change_img
  },
  {
    path: '/timeline/post',
    name: 'post',
    component: Post
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

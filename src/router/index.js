import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home.vue'
import Chat from '../views/home/Chat'
import Login from '../views/Login.vue'
import Timeline from '../views/timeline/Timeline.vue'
import Configuration from '../views/configuration/Configuration'
import Post from "../views/timeline/Post.vue"
import ChangeName from "../views/configuration/ChangeName"
import ChangeImg from "../views/configuration/ChangeImg"
import CreateGroup from "../views/home/CreateGroup"
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
    path: '/home/chat',
    name: 'chat',
    component: Chat
  },
  {
    path: '/home/creategroup',
    name: 'creategroup',
    component: CreateGroup

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
    component: ChangeName
  },
  {
    path: '/configuration/changeimg',
    name: 'changeimg',
    component: ChangeImg
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

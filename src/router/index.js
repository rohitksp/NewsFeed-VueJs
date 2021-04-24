import Vue from 'vue'
import VueRouter from 'vue-router'
import PostList from '../components/PostList.vue'
import PostCreate from '../components/PostCreate.vue'
import PostEdit from '../components/PostEdit.vue'
import PostDelete from '../components/PostDelete.vue'
import PostView from '../components/PostView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: PostList
  },
  {
    path: '/postcreate',
    name: 'postcreate',
    component: PostCreate
  },
  {
    path: '/postedit/:id',
    name: 'postedit',
    component: PostEdit
  },
  {
    path: '/postdelete/:id',
    name: 'postdelete',
    component: PostDelete
  },
  {
    path: '/postview/:id',
    name: 'postview',
    component: PostView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
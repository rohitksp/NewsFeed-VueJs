import Vue from "vue";
import VueRouter from "vue-router";
import PostList from "../components/posts/PostList.vue";
import PostCreate from "../components/posts/PostCreate.vue";
import PostEdit from "../components/posts/PostEdit.vue";
import PostDelete from "../components/posts/PostDelete.vue";
import PostView from "../components/posts/PostView.vue";
import NotFound from "../components/NotFound.vue";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";

if (!process || process.env.NODE_ENV !== "test") {
  Vue.use(VueRouter);
}

const routes = [
  {
    path: "/",
    name: "home",
    component: PostList,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "*",
    name: "not-found",
    component: NotFound,
  },
  {
    path: "/postcreate",
    name: "postcreate",
    component: PostCreate,
  },
  {
    path: "/postedit/:id",
    name: "postedit",
    props: true,
    component: PostEdit,
  },
  {
    path: "/postdelete/:id",
    name: "postdelete",
    props: true,
    component: PostDelete,
  },
  {
    path: "/postview/:id",
    name: "postview",
    props: true,
    component: PostView,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;

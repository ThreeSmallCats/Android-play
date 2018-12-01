import Vue from "vue";
import Router from "vue-router";
// import index from "./views/index.vue";
// import search from "./views/search.vue";
// import project from "./views/project.vue";
// import weChat from "./views/weChat.vue";
// import system from "./views/system.vue";
// import navigation from "./views/navigation.vue";
// import iframe from "./views/iframe.vue";
// 路由懒加载
const index = () => import('./views/index.vue')
const search = () => import('./views/search.vue')
const project = () => import('./views/project.vue')
const weChat = () => import('./views/weChat.vue')
const system = () => import('./views/system.vue')
const navigation = () => import('./views/navigation.vue')
const iframe = () => import('./views/iframe.vue')
Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: 'index'
    },
    {
      path: "/index",
      component: index
    },
    {
      path: "/search",
      component: search
    },
    {
      path: "/project",
      component: project
    },
    {
      path: "/weChat",
      component: weChat
    },
    {
      path: "/system",
      component: system
    },
    {
      path: "/navigation",
      component: navigation
    },
    {
      path:"/iframe",
      component:iframe
    }
  ]
});
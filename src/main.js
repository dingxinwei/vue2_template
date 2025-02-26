import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Foo from './components/Foo.vue'
const Bar = () =>
  import(/* webpackChunkName: "group-bar" */ './components/Bar.vue') // 异步加载文件

const CustomApp = Vue.extend(App)
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]

const router = new VueRouter({
  routes
})

new CustomApp({
  router
}).$mount('#test')

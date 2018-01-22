import Vue from 'vue'
import Router from 'vue-router'
import indexPage from '@/components/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: indexPage
    }
  ]
})

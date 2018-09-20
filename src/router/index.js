import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Setting from '@/components/Setting'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting
    }
  ]
})

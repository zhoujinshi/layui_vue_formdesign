import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import InputSet from '@/components/InputSet'
import LayoutSet from '@/components/LayoutSet'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/inputSet',
      name: 'InputSet',
      component: InputSet
    },
    {
      path: '/layoutSet',
      name: 'LayoutSet',
      component: LayoutSet
    }
  ]
})

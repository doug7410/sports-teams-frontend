import Vue from 'vue'
import VueRouter from 'vue-router';
import TeamList from './components/TeamList'
import Team from './components/Team'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: TeamList
    },
    {
      path: '/team/:id',
      component: Team
    }
  ]
})


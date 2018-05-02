import Vue from 'vue/dist/vue.esm.browser'
import App from './App.vue'
import store from './store'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import router from './routes'
import 'vuetify/dist/vuetify.min.css'
import Vuex from 'vuex'


Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(Vuetify)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')

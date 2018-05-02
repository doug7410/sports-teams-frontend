import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    teams: []
  },

  getters: {
    teams: state => state.teams
  },

  actions: {
    getTeams({ commit }) {
      axios.get('http://localhost:8000/api/team', {
        params: {
          api_token: 'GpTlVisRWR8WwFWQVBB7BMNoKnSq8AogJMEi90dcsvhVP4JdrUr2Wk4SM4XX'
        }
      }).then(teams => {
        commit('setTeams', teams.data)
      })
    }
  },

  mutations: {
    setTeams(state, teams) {
      state.teams = teams
    }
  }
})
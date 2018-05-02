<template>
  <div id="app">
    <v-app id="inspire">
      <v-toolbar color="indigo" dark fixed app>
        <v-toolbar-title>Sports Teams</v-toolbar-title>
      </v-toolbar>
      <v-content>
        <v-container fluid fill-height>
          <v-layout>
            <v-flex text-xs-left>
              <router-view></router-view>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
      <v-footer color="indigo" app inset>
        <span class="white--text">&copy; 2017</span>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import TeamList from './components/TeamList';

export default {
  name: 'app',
  data(){
    return {
    }
  },
  components: {
    TeamList
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

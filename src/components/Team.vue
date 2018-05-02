<template>
  <div>
    <h2>Team:</h2>
    <div><strong>Name:</strong> {{ team.name }}</div>
    <div><strong>City:</strong> {{team.city}}</div>
    <v-btn color="orange darken-2" flat dark small @click="$router.push('/')">
      <v-icon dark left>arrow_back</v-icon>
      Back to teams list
    </v-btn>

    <v-dialog v-model="dialog" max-width="500px">
      <v-btn color="primary" dark slot="activator" class="mb-2">Add a player</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field label="First Name" v-model="editedPlayer.first_name"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Last Name" v-model="editedPlayer.last_name"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <h2>Players</h2>
    <v-data-table
        :headers="headers"
        :items="team.players"
        hide-actions
        class="player-list"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.first_name }}</td>
        <td>{{ props.item.last_name }}</td>
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editPlayer(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
        </td>
      </template>
      <template slot="no-data">
        No players on this team yet,
        <a @click.prevent="dialog = true">add one.</a>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  import axios from 'axios'
  import { apiUrl, apiToken } from "../config";

  export default {
    data: () => ({
      team: {},
      dialog: false,
      headers: [
        {text: 'First Name', value: 'first_name'},
        {text: 'Last Name', value: 'last_name'},
        {text: 'Actions', value: 'name', sortable: false}
      ],
      editedIndex: -1,
      editedPlayer: {
        id: 0,
        first_name: '',
        last_name: '',
      },
      defaultPlayer: {
        id: 0,
        first_name: '',
        last_name: ''
      }
    }),

    computed: {
      formTitle() {
        return this.editedIndex === -1 ? 'Add Player' : 'Edit Player'
      }
    },

    watch: {
      dialog(val) {
        val || this.close()
      }
    },

    created() {
      this.initialize()
    },

    methods: {
      initialize() {
        axios.get(`${apiUrl}/team/${this.$route.params.id}`, {
          params: {
            api_token: apiToken
          }
        }).then(team => {
          this.team = team.data[0]
        })
      },

      editPlayer(player) {
        this.editedIndex = this.team.players.indexOf(player)
        this.editedPlayer = Object.assign({}, player)
        this.dialog = true
      },

      close() {
        this.dialog = false
        setTimeout(() => {
          this.editedPlayer = Object.assign({}, this.defaultPlayer)
          this.editedIndex = -1
        }, 300)
      },

      save() {
        if (this.editedIndex > -1) {
          axios.put(`${apiUrl}/player/${this.editedPlayer.id}`, {
            api_token: apiToken,
            first_name: this.editedPlayer.first_name,
            last_name: this.editedPlayer.last_name,
          }).then(player => {
            console.log(this.editedIndex)
            console.log(this.team.players)
            Object.assign(this.team.players[this.editedIndex], player.data)
            this.close()
          })
        } else {
          axios.post(`${apiUrl}/player`, {
            api_token: apiToken,
            first_name: this.editedPlayer.first_name,
            last_name: this.editedPlayer.last_name,
            team_id: this.$route.params.id
          }).then(player => {
            this.team.players.push(player.data)
            this.close()
          })
        }
      }
    }
  }
</script>

<style scoped>
  .player-list {
    max-width: 600px;
    border: solid 1px #ccc;
  }
</style>
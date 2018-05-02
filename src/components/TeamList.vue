<template>
  <div>
    <v-dialog v-model="dialog" max-width="500px">
      <v-btn color="primary" dark slot="activator" class="mb-2">Add a team</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Add a team</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Team Name" v-model="editedTeam.name"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="City" v-model="editedTeam.city"></v-text-field>
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

    <v-data-table
        :headers="headers"
        :items="teams"
        hide-actions
        class="team-list"
    >
      <template slot="items" slot-scope="props">
        <td>
          <a @click.prevent="$router.push(`/team/${props.item.id}`)">
            {{ props.item.name }}
          </a>
        </td>
        <td>{{ props.item.city }}</td>
        <td>{{ props.item.players.length }}</td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  import axios from 'axios'
  import { apiUrl, apiToken } from "../config";

  export default {
    name: "team-list",
    data() {
      return {
        headers: [
          {
            text: 'Team Name',
            align: 'left',
            sortable: true,
            value: 'name'
          },
          {text: 'City', value: 'calories', align: 'left'},
          {text: 'Number of players', value: 'fat', align: 'left'},
        ],
        teams: [],
        dialog: false,
        editedIndex: -1,
        editedTeam: {
          id: 0,
          name: '',
          city: '',
        },
        defaultTeam: {
          id: 0,
          name: '',
          city: ''
        },
      }
    },
    created() {
      axios.get(`${apiUrl}/team`, {
        params: {
          api_token: apiToken
        }
      }).then(teams => {
        this.teams = teams.data
      })
    },

    watch: {
      dialog(val) {
        val || this.close()
      }
    },

    methods: {
      close() {
        this.dialog = false
        setTimeout(() => {
          this.editedTeam = Object.assign({}, this.defaultTeam)
          this.editedIndex = -1
        }, 300)
      },

      save() {
        axios.post(`${apiUrl}/team`, {
          api_token: apiToken,
          name: this.editedTeam.name,
          city: this.editedTeam.city
        }).then(team => {
          this.teams.push({
            id: team.data.id,
            name: team.data.name,
            city: team.data.city,
            players: []
          })
        })
        this.close()
      }
    }
  }
</script>

<style scoped>
  .team-list {
    max-width: 600px;
    border: solid 1px #ccc;
  }

  a {
    /*text-decoration: none;*/
  }
</style>
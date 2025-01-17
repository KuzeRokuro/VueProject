<template>
  <div>
    <h1>Tournament Page</h1>
    <button @click="navigateToAddTournament" class="add-tournament-button">Create Tournament</button>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Date</th>
          <th>Card Game</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tournament in sortedTournaments" :key="tournament.id">
          <td>{{ tournament.id }}</td>
          <td>{{ tournament.t_name }}</td>
          <td>{{ tournament.date }}</td>
          <td>{{ tournament.cardgame }}</td>
          <td>
            <button class="btn-action" @click="editTournament(tournament.id)">
              Edit
            </button>
            <button v-if="!hasMatch(tournament.id)" class="btn-action" @click="startTournament(tournament.id)">
              Start
            </button>
            <button class="btn-action" @click="rankTournament(tournament.id)">
              See Ranking
            </button>
            <button class="btn-action" @click="ViewMatch(tournament.id)">
              Share
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TournamentPage",
  data() {
    return {
      tournaments: [],
      matches: [],
      errorMessage: "",
    };
  },
  computed: {
    sortedTournaments() {
      return this.tournaments.slice().sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
    },
    hasMatch() {
      return (tournamentId) => {
        if (!this.matches) {
          return false;
        }
        const tournament = this.tournaments.find(t => t.id === tournamentId);
        return tournament ? this.matches.some(match => match.tournament_id === tournamentId) : false;
      };
    },
  },
  methods: {
    fetchTournaments() {
      axios
        .get("https://kuzerokuro.pythonanywhere.com/Records/Tournament/")
        .then((response) => {
          this.tournaments = response.data;
        })
        .catch((error) => {
          console.error("Error fetching tournament data:", error);
          this.errorMessage = "Failed to fetch tournament data. Please try again later.";
        });
    },
    fetchMatches() {
      axios
        .get("https://kuzerokuro.pythonanywhere.com/Records/Match/")
        .then((response) => {
          this.matches = response.data;
          this.checkMatches();
        })
        .catch((error) => {
          console.error("Error fetching match data:", error);
          this.errorMessage = "Failed to fetch match data. Please try again later.";
        });
    },
    checkMatches() {
      this.tournaments.forEach((tournament) => {
        tournament.hasMatch = this.hasMatch(tournament.id);
      });
    },
    navigateToAddTournament() {
      this.$router.push("/addtournament");
    },
    editTournament(tournamentId) {
      this.$router.push(`/edit-tournament/${tournamentId}`);
    },
    startTournament(tournamentId) {
      this.$router.push(`/start-tournament/${tournamentId}`);
    },
    rankTournament(tournamentId) {
      this.$router.push(`/rank-tournament/${tournamentId}`);
    },
    ViewMatch(tournamentId) {
      this.$router.push(`/view-match/${tournamentId}`);
    },
  },
  created() {
    this.fetchTournaments();
    this.fetchMatches();
  },
};
</script>

<style scoped>
  table {
    width: 80%;
    max-width: 800px;
    margin: 20px auto;
    border-collapse: collapse;
    font-family: Arial, sans-serif;
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  th, td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #303031;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 0.5px;
  }

  td {
    color: #333;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  tr:hover {
    background-color: #f1f1f1;
    cursor: pointer;
  }

  .error {
    color: red;
    margin-top: 10px;
  }

  .add-tournament-button {
    display: block;
    margin: 20px auto;
    padding: 10px 20px;
    background-color: #303031;
    color: #fff;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .add-player-button:hover {
    background-color: #444;
  }

  .btn-action {
    padding: 10px 10px;
    font-size: 0.9rem;
    background-color: #ffc107;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 55%;
    margin-bottom: 3px;
  }

  .btn-action:hover {
    background-color: rgb(252, 127, 44);
  }
</style>

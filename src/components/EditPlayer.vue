<template>
    <div class="container">
      <h1 class="form-title">Edit Player</h1>
      <form @submit.prevent="updatePlayer">
        <div class="form-box">
          <label for="name" class="form-label">
            Name
          </label>
          <input
            id="name"
            type="text"
            class="form-control"
            v-model="player.name"
            required
          />
          <label for="phone" class="form-label">
            Phone Number
          </label>
          <input
            id="phone"
            type="text"
            class="form-control"
            v-model="player.phone"
          />
          <label for="totalmatch" class="form-label">
          Total Matches
        </label>
        <input
          id="totalmatch"
          type="number"
          class="form-control"
          v-model="player.totalmatch"
          required
        />
        <label for="totalwins" class="form-label">
          Total Wins
        </label>
        <input
          id="totalwins"
          type="number"
          class="form-control"
          v-model="player.totalwins"
          required
        />
          <button
            class="btn-submit"
            type="submit"
          >
             Update Player
          </button>
        </div>
      </form>
      <p v-if="error" style="color: red;">{{ error }}</p>
    </div>
  </template>

<script>
import axios from "axios";

export default {
  name: "EditPlayer",
  data() {
    return {
      player: {
        name: "",
        phoneNumber: "",
        totalwins: "",
        totalmatch: "",
      },
      error: null,
    };
  },
  created() {
    this.fetchPlayerDetails();
  },
  methods: {
    async fetchPlayerDetails() {
      const playerId = this.$route.params.id; // Retrieve player ID from route parameters
      try {
        const response = await axios.get(`https://kuzerokuro.pythonanywhere.com/Records/Player/${playerId}/`);
        this.player = response.data;
      } catch (error) {
        this.error = "Failed to fetch player details. Please try again later.";
        console.error(error);
      }
    },
    async updatePlayer() {
      const playerId = this.$route.params.id;
      console.log("Payload being sent:", JSON.stringify(this.player));
      try {
        await axios.put(`https://kuzerokuro.pythonanywhere.com/Records/Player/${playerId}/`, this.player);
        alert("Player updated successfully!");
        this.$router.push("/players"); // Redirect to players page
      } catch (error) {
        this.error = "Failed to update player. Please try again later.";
        console.error(error);
      }
    },
  },
};
</script>

<style>

  .form-title {
    font-size: 2.5rem;
    color: #303031;
    font-family: 'Roboto', sans-serif;
    text-align: center;
    margin-top: 5rem;
    margin-bottom: 3rem; /* Space below title */
  }

  .form-box {
    background-color: #ffffff; /* White background for the box */
    padding: 20px; /* Add some space inside the box */
    border-radius: 8px; /* Rounded corners */
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4); /* Subtle shadow effect */
    width: 100%;
    max-width: 400px; /* Set a max width for the box */
    margin: 0 auto; /* Center the box horizontally */
  }


  .form-label {
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    font-weight: bold;
    color: #333;
  }

  .btn-submit {

    padding: 10px 20px;
    font-size: 1rem;
    color: #fff;
    background-color: #ff830e ;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    margin-top: 2rem;
    width: 100%;

  }

  .btn-submit:hover {
    background-color:rgb(98, 197, 255);

  }

  .form-box-2{
        background-color: #ffffff; /* White background for the box */
        padding: 20px; /* Add some space inside the box */
        border-radius: 8px; /* Rounded corners */
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4); /* Subtle shadow effect */
        width: 100%;
        max-width: 900px; /* Set a max width for the box */
        margin: 0 auto; /* Center the box horizontally */
        margin-top: 40px;
        margin-bottom: 40px;
  }

</style>

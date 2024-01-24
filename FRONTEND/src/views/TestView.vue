<template>
    <div>
      <h2>Formularz zmiany opisu</h2>
      <form @submit.prevent="submitForm">
        <label for="description">Opis:</label>
        <input
          type="text"
          id="description"
          v-model="description"
          placeholder="Wprowadź opis"
        />
        <button type="submit">Zapisz zmiany</button>
      </form>
  
      <div v-if="submitted">
        <h3>Zmieniony opis:</h3>
        <p>{{ updatedDescription }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import dataService from "@/services/dataService.js";
  export default {
    data() {
      return {
        description: "",
        submitted: false,
        updatedDescription: "",
      };
    },
    methods: {
      submitForm() {
        const userId = "b91f95c8-71a1-4ca1-b92b-af630418ad7d"
        dataService.changeDescription(userId, this.description).then(response => {
          this.updatedDescription = response.data.updatedDescription;
          this.submitted = true;
        });
  
        // Symulacja:
        this.updatedDescription = this.description;
        this.submitted = true;
      },
    },
  };
  </script>
  

  
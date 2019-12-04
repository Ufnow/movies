<template>
  <div class="main">
    <h1>Search</h1>
  <div class="search">
    <input name="search"  id="search" v-model="searchValue" @input="handleInput"/>
  </div>
  <ul>
    <li v-for="item in results" :key="item.id">
      <p>{{ item.name }}</p>
       </li>

  </ul>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios';
import debounce  from 'lodash.debounce';


const API = 'https://api.themoviedb.org/3/search/company'
const apikey ='?api_key=30b2ae883d2dd411cf9fa724a9e129f3'

export default {
name: 'Home',
    
    data () {
        return {
            searchValue: '',
            results: []
        };
    
    },
    methods: {
    handleInput: debounce(function() {
      axios.get(API + apikey + '&query=' + this.searchValue)
      .then((response) => {
        this.results = response.data.results;
        console.log(this.results)
       
      })
      .catch((error) => {
        console.log(error)
      })
       
        
    },500),



}
}
/* eslint-disable */
</script>

<style scooped>
.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  
}
</style>
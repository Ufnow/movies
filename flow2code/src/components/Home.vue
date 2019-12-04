<template>
  <div class="main">
    <h1>Search</h1>
  <div class="search">
    <input name="search"  id="search" v-model="searchValue" @input="handleInput"/>
  </div>
  <!-- <ul>
    <li v-for="item in results" :key="item.id">
      <p>{{ item.title }}</p>
       </li>

  </ul> -->
  
  
  <div class="card"  v-for="item in results" :key="item.id">
  <div class="row no-gutters">
    <div class="imgcont">
      <img :src="'http://image.tmdb.org/t/p/w185' + item.poster_path" onerror="this.onerror=null; this.src='http://opeanut.com/wp-content/themes/boss-child/images/no-img.jpg'" class="card-img" alt="...">
    </div>
    <div class="content">
      <div class="card-body">
        <h5 class="card-title">{{ item.title }}</h5>
        <p class="card-text">Popularity: {{ item.popularity }}</p>
        <p class="card-text">Votes: {{ item.vote_count }}</p>
        
      </div>
    </div>
  </div>
</div>
  
  
  
  
  
  
  
  
  
  
  
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios';
import debounce  from 'lodash.debounce';


const API = 'https://api.themoviedb.org/3/search/movie'
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
      // .catch((error) => {
      //   // console.log(error)
      // })
       
        
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
.search {
  background: azure;
}
.card {
  width: 600px;
  height: auto;
  flex-wrap: nowrap;
  margin:3px;
}
.imgcont {
height: 205px;
width: 185px;

}
img {
  height: 100%;
  border-radius: 15px 15px 15px 15px;
}
.content{
  max-width:410px;
  padding:0;
  margin:0;
}
.card-body{
  /* display: flex; */
  /* flex-direction: column; */
  
  /* word-wrap: word-wrap; */
}
</style>
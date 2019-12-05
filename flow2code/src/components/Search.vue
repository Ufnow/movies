<template>
  <div class="main">
   
    
  <div class="search">
       <input name="search" placeholder="Enter your title" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter your title'"  id="search" v-model="searchValue" @input="handleInput"/>
  </div>
  <div class = "interactions" v-if="firstinteraction">
       <p>Enter your title to search the movies</p>
  </div>
<div class = "interactions" v-if="noresults">
       <p>There is no results</p>
</div>
<pulse-loader v-if="!loaded"></pulse-loader>
  <div class = "wrapper" v-if ="loaded">
    <div class = "movie-container">
  <div class="card" v-for="item in results" :key="item.id">
    <div class="row no-gutters">
      <div class="imgcont">
        <img :src="'http://image.tmdb.org/t/p/w185' + item.poster_path" onerror="this.onerror=null; this.src='.\.\/images/img.noimg'" class="card-img" alt="...">
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
<nav aria-label="Page navigation" v-if="totalPages>1 && !noresults">
  <ul class="pagination">
    <li class="page-item"><a class="page-link text-secondary" href="#" v-on:click="onChangePage(currentPage-1)">Previous</a></li>
    <li class="page-item" v-for="n in totalPages" :key="n" v-on:click="onChangePage(n)"><a class="page-link text-secondary" href="#">{{ n }}</a></li>
    <li class="page-item"><a class="page-link text-secondary" href="#" v-on:click="onChangePage(currentPage+1)">Next</a></li>
  </ul>
  <p class = "current-page">Current page: {{currentPage}}</p>
</nav>
</div>
</div>

</template>

<script>

import axios from 'axios';
import debounce  from 'lodash.debounce';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

const API = 'https://api.themoviedb.org/3/search/movie'
const apikey ='?api_key=30b2ae883d2dd411cf9fa724a9e129f3'




export default {

name: 'Search',
  components: {
    PulseLoader
  }, 
    data () {
        return {
            searchValue: '',
            results: [],
            firstinteraction: true,
            noresults: false,
            
           
           //pagination
            currentPage: 1,
            totalPages: 1,
      
         //loader
            loaded: true,
            color: '#black',
            height: '70px',
            width: '10px',
        };
    
    },
    methods: {
    
    
    //Searching
    handleInput: debounce(function() {
      if(!this.searchValue == ''){

      
      this.loaded = false;
      axios.get(API + apikey + '&query=' + this.searchValue)
      .then((response) => {
        this.results = response.data.results;
        this.totalPages = response.data.total_pages;
        if(this.totalPages>10) {
          this.totalPages = 10
        }
        this.firstinteraction = false;
        this.loaded= true;
        if(this.results.length == 0) {
          this.noresults = true
          
        }
        else {
          this.noresults = false
         
        }
        
      })
     }},500),


//Pagination method
onChangePage(n) {
       this.currentPage = n;
        this.loaded= false;
       if(this.currentPage >0 && this.currentPage<=this.totalPages) {
        axios.get(API + apikey + '&query=' + this.searchValue + "&page=" + this.currentPage)
          .then((response) => {
        this.results = response.data.results;
           })
            
    } else if(this.currentPage == 0) {
      this.currentPage = this.currentPage +1

    }
    else if(this.currentPage > this.totalPages) {
      this.currentPage = this.currentPage -1

    }
     this.loaded= true;
    }

}  

}





</script>

<style scooped>
.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  
  
}
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;
 
  


}
.movie-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  padding-bottom: 15px; 


}
.row {
  background: rgb(240, 239, 239)
}
.search {
  background: rgb(255, 255, 255);
  padding-bottom: 15px; 
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


.interactions {
  font-size: 30px;
  margin-top: 70px;

}
.search input {
  border: 0;
 border-bottom: 2px solid rgb(6, 10, 14);
 width: 100%;
 font-size: 20px;
 line-height: 35px;
 height: 35px;
 text-align: center;
 padding: 10px;
 background: transparent;
	
}


</style>
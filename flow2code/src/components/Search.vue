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
  
  <div class="card"  v-for="item in results" :key="item.id">
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
<nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
    <li class="page-item" v-for="n in totalPages" :key="n" v-on:click="onChangePage(n)"><a class="page-link" href="#">{{ n }}</a></li>
    <li class="page-item"><a class="page-link" href="#">Next</a></li>
  </ul>
</nav>

</div>
</template>

<script>
/* eslint-disable */
import axios from 'axios';
import debounce  from 'lodash.debounce';

const API = 'https://api.themoviedb.org/3/search/movie'
const apikey ='?api_key=30b2ae883d2dd411cf9fa724a9e129f3'




export default {
name: 'Search',
    
    data () {
        return {
            searchValue: '',
            results: [],
            firstinteraction: true,
            noresults: false,
            // images: {
            //     img: require('..\images\no-img\.jpg')
            // }
           
            currentPage: 1,
            totalPages: 1
        };
    
    },
    methods: {
    
    handleInput: debounce(function() {
      axios.get(API + apikey + '&query=' + this.searchValue)
      .then((response) => {
        this.results = response.data.results;
        this.totalPages = response.data.total_pages;
        this.firstinteraction = false;
        if(this.results.length == 0) {
          this.noresults = true
        }
        else {
          this.noresults = false
        }
      })
      .catch((error) => {
        error = true;
      })
       
        
    },500),

onChangePage(n) {
       this.currentPage = n;
       axios.get(API + apikey + '&query=' + this.searchValue + "&page=" + this.currentPage)
      .then((response) => {
        this.results = response.data.results;
        })
            
        }


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
  height: 100%;
  
  
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
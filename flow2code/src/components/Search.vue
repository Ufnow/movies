<template>
  <div class="main">
   <div class="search">
       <input name="search" placeholder="Enter your title" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter your title'"  id="search" v-model="searchValue" @input="handleInput"/>
 </div>
 <div class = "sortbuttons" v-if="results.length != 0">
  <button type="button" id="details-btn" class="btn btn-dark" v-on:click="sortByPopularity()">Sort by popularity</button>
  <button type="button" id="details-btn" class="btn btn-dark" v-on:click="sortByTitle()">Sort by title</button>
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
        <img :src="'http://image.tmdb.org/t/p/w185' + item.poster_path" onerror="this.onerror=null; this.src='https://semantic-ui.com/images/wireframe/image.png'" class="card-img" >
      </div>
    <div class="content">
       <div class="card-body">
        <h5 class="card-title">{{ item.title }}</h5>
        <p class="card-text">Popularity: {{ item.popularity }}</p>
        <p class="card-text">Votes: {{ item.vote_count }}</p>
       </div>
     <div class ="btn-cont">
     <button type="button" id="details-btn" class="btn btn-danger" v-on:click="handleModalOpen(item)">More details</button>
     </div>
     </div>
  </div>
</div>
 <Modal v-if="modalOpen" :item="modalItem" @closeModal="modalOpen = false" />
</div>
<nav aria-label="Page navigation" v-if="totalPages>1 && !noresults">
  <ul class="pagination">
    <li class="page-item">
      <a class="page-link text-secondary" href="#" v-on:click="onChangePage(currentPage-1)">Previous</a></li>
    <li class="page-item" v-for="n in totalPages" :key="n" v-on:click="onChangePage(n)"><a class="page-link text-secondary" href="#">{{ n }}</a>
    </li>
    <li class="page-item">
      <a class="page-link text-secondary" href="#" v-on:click="onChangePage(currentPage+1)">Next</a>
      </li>
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
import Modal from './Modal.vue';
const API = 'https://api.themoviedb.org/3/search/movie'
const API_movie_details = 'https://api.themoviedb.org/3/movie'
const apikey ='?api_key=30b2ae883d2dd411cf9fa724a9e129f3'




export default {

name: 'Search',
  components: {
    PulseLoader,
    Modal
  },

    data () {
        return {
            searchValue: '',
            results: [],
            firstinteraction: true,
            noresults: false,
            modalOpen: false,
            modalItem: null,
           clickCount: 0,
           //pagination
            currentPage: 1,
            totalPages: 1,
      
         //loader
            loaded: true,
            
        };
    
    },
    methods: {
      
      
  // Sorting methods    
  sortByPopularity() {
  this.clickCount = this.clickCount +1
  if(this.clickCount % 2 != 0) {
  this.results.sort((a,b) => a.popularity < b.popularity ? 1 : -1);
  }
  else {
    this.results.sort((a,b) => a.popularity > b.popularity ? 1 : -1);
  }
}, 

sortByTitle() {
  this.clickCount = this.clickCount +1
  if(this.clickCount % 2 != 0) {
  this.results.sort((a,b) => a.title < b.title ? 1 : -1);
  }
  else {
    this.results.sort((a,b) => a.title > b.title ? 1 : -1);
  } 
     } ,


    // Modal open method
    handleModalOpen(item) {
      this.modalOpen = false;
         axios.get(API_movie_details + '/' + item.id + apikey)
          .then((response) => {
        this.item = response.data
        this.modalOpen = true;
        this.modalItem = this.item
                            })
           
           
    },

    //Searching
    handleInput: debounce(function() {
      if(!this.searchValue == ''){

        this.firstinteraction = false;
      this.loaded = false;
      axios.get(API + apikey + '&query=' + this.searchValue)
      .then((response) => {
        this.results = response.data.results;
        this.totalPages = response.data.total_pages;
        
        if(this.totalPages>10) {
          this.totalPages = 10
        }
            this.loaded= true;
        if(this.results.length == 0) {
          this.noresults = true
          }
        else {
          this.noresults = false
         }
        this.currentPage = 1
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

} ,

//Sorting methods



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

.sortbuttons {

  /* position: absolute; */
  left:50px;
  top:160px;
}
.sortbuttons button {

  margin: 3px;
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
nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.btn-cont {
  position: absolute;
  right:5px;
  bottom: 5px;
  }

@media screen and (max-width:650px) {


.card {
  width: 100%;
  
  }

.imgcont {
height: 190px;
width: 150px;

}


.content{
  max-width:340px;
  padding:0;
  margin:0;
  
  
}
.card-title {
  font-size:80%;
  margin:0px;
  padding: 0;
}
.card-text {
  font-size:70%;
  margin:3px;
}


}
@media screen and (max-width:540px) {
.page-link {
  font-size: 30%;
}

.interactions {
  font-size:95%;
  text-align: center;
  }


.content{
  max-width:280px;
  
  
  
}

#details-btn {
  font-size: 80%;
  }


}
@media screen and (max-width:450px) {
.imgcont {
height: 140px;
width: 100px;

}
button {
  font-size: 60%;
  }
.card-title {
  font-size:65%;
}
.card-text {
  font-size:50%;
}

}

@media screen and (max-width:360px) {
.imgcont {
height: 110px;
width: 70px;

}
.card-title {
  font-size:80%;
}
.card-text {
  font-size:50%;
}
.content{
  max-width:250px;
  
  
  
}

}

</style>

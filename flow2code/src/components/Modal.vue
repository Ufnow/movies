<template>
  <div class="outerWrapper">
    <div class="innerWrapper">
      <div class="photo">
        <img :src="'http://image.tmdb.org/t/p/w185' + item.poster_path" onerror="this.onerror=null; this.src='https://semantic-ui.com/images/wireframe/image.png'" class="card-img" >
      </div>
      <div class="description">
        <h2 class="title">{{ title }}</h2>
        <p class="description-text">
          {{ description }}
        </p>
        <p class="description-text">Genre:  
            <span class="description-text-span" v-for="(genre,index) in item.genres" :key="genre.id">
                <span class="description-text-span" v-if="index != 0">, </span> 
                {{ genre.name }}</span>
                <span class="description-text-span" v-if="item.genres.length == 0">No informations</span>
                </p>
            
        <p class="description-text">Production countries:  
            <span class="description-text-span" v-for="(pc,index) in item.production_countries" :key="pc.name">
                <span class="description-text-span" v-if="index != 0">, </span> 
                {{ pc.name }}</span>
                <span class="description-text-span" v-if="item.production_countries.length == 0">No informations</span>
                </p>
             <a v-if="item.imdb_id != null" :href="'https://www.imdb.com/title/' + item.imdb_id" class="btn btn-danger description-text" role="button">IMDB link</a>
      </div>
    </div>
    <div class="close" @click="$emit('closeModal')" />
  </div>
</template>
<script>
export default {
  name: 'Modal',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      
      title: null,
      description: null,
    };
  },
  mounted() {
   
    this.title = this.item.title;
    this.description = this.item.overview.substring(0, 200);
  },
};


</script>
<style  scoped>
.outerWrapper {
background: #f6f6f6;
max-width: 60%;

max-height: 500px;
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
margin: auto;
box-shadow: 0 30px 30px -10px rgba(0, 0, 0, .3);
}
 

.close {
position: absolute;
width: 30px;
height: 30px;
padding: 30px;
right: 0;
top: 0;
cursor: pointer;
}
.close::before, .close::after {
position: absolute;
top: 30px;
right: 20px;
content: '';
width: 20px;
height: 2px;
background: black;
display: block;
}
.close::before {
transform: rotate(45deg);
}
.close::after {
     transform: rotate(-45deg);
}
.innerWrapper {
display: flex;
height: 100%;
padding: 50px;
width: 100%;
justify-content: center;
align-items: flex-start;
/* flex-direction: column; */
flex-direction: row;

}

.photo {
min-width: 25%;
max-width: 25%;
min-height: 80%;
max-height: 80%;
margin-right: 20px;
height: 80%;
}
.photo img {
width: 100%;
height: 100%;;

}
.description {
color: #333;
text-align: justify;
min-width: 70%;
}
.title {
color: #f6f6f6;

}
@media screen and (max-width: 1000px) {
.outerWrapper{
    min-width: 95%;
    max-height: 300px;
    position: fixed;
    

}
.innerWrapper {

justify-content: space-around;
padding-top: 50px;
padding-bottom: 50px;
padding-right: 5px;
padding-left: 5px; 
width: 100%;


}
.photo {
min-width: 40%;
max-width: 40%;
min-height: 100%;
max-height: 100%;
margin-right: 5px;
height: 30%;

   }
.description-text {
    font-size: 50%;
    padding-top: 5px;
    margin: 5px;
}
.title {
    font-size:80%;
    height: 50px;
    margin-bottom:0;
    
}
.description{
    max-width: 55%;
    min-width: 55%;  
    
}
}
</style>
<template>
  <div class="outerWrapper">
    <div class="innerWrapper">
      <div class="photo">
        <img :src="'http://image.tmdb.org/t/p/w185' + item.poster_path" onerror="this.onerror=null; this.src='https://semantic-ui.com/images/wireframe/image.png'" class="card-img" >
      </div>
      <div class="description">
        <h2 class="title">{{ title }}</h2>
        <p class="description">
          {{ description }}
        </p>
        <p>Genre:  
            <span v-for="(genre,index) in item.genres" :key="genre.id">
                <span v-if="index != 0">, </span> 
                {{ genre.name }}</span>
                <span v-if="item.genres.length == 0">No informations</span>
                </p>
             <p>
        <p>Production countries:  
            <span v-for="(pc,index) in item.production_countries" :key="pc.name">
                <span v-if="index != 0">, </span> 
                {{ pc.name }}</span>
                <span v-if="item.production_countries.length == 0">No informations</span>
                </p>
             <a :href="'https://www.imdb.com/title/' + item.imdb_id" class="btn btn-danger" role="button">IMDB link</a>
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
}
 @media (min-width: 1024px) {
.outerWrapper {


left: 0;
right: 0;
top: 0;
bottom: 0;
margin: auto;
box-shadow: 0 30px 30px -10px rgba(0, 0, 0, .3);
	}
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
flex-direction: column;

}
@media (min-width: 1024px) {
.innerWrapper {
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
}

.photo img {
width: 100%;
height: 100%;;

}
.description {
color: #333;
text-align: justify;
min-width: 70%;;
}
.title {
color: #f6f6f6;

}

</style>
<template>
  <div id ="app">
     <div class = "title">
      <h1 class = "main-title">Welcome to my Movie Search app</h1>
      <p>Lets find your movies!</p>
      </div>
  <Search />
  </div>
</template>

<script>
import Search from './components/Search.vue'

export default {
  name: 'app',
  components: {
    Search
  }
}

</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0;
 
  font-family: 'Montserrat', sans-serif;
  

}
.title {
  padding: 0;
  margin-bottom:30px;
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  width: 100%;
  color: white;
  height: 130px;
  background: rgb(26, 25, 25);;
}

@media screen and (max-width:500px) {
  .title {
    font-size: 70%;
  }
  .main-title {
    font-size: 180%;
  }

}
@import'~bootstrap/dist/css/bootstrap.css';
@import url('https://fonts.googleapis.com/css?family=Montserrat:300,400,700,800i&display=swap');

</style>

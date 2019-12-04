<template>
  <div id ="app">
    
  <Home />
  </div>
</template>

<script>
import Home from './components/Home.vue'

export default {
  name: 'app',
  components: {
    Home
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
  background-color: gray;

}
@import'~bootstrap/dist/css/bootstrap.css'
</style>

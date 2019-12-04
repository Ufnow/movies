<template>
    <div><div class="card"  v-for="item in results" :key="item.id">
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
</div></div>
</template>
<script>
export default {
    name: 'Items',
}
</script>
<style scooped>

</style>
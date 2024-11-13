<script setup>
import config from '@/config';
</script>
<template>
  <div class="jumbotron p-5 text-white text-center">
    <h1 class="black">{{ config.title }}</h1>
    <!-- <p>{{ config.subtitle }}</p> -->
  </div>
</template>
<style scoped>
.black{
  color:black;
}
.jumbotron {
  background-color: #FFD800;
  padding: 2rem;
  margin-top: 1.5rem;
}
</style>

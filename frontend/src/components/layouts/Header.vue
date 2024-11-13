<script setup>
import config from '@/config';
</script>
<template>
  <div class="jumbotron pt-2 pb-2 text-center">
    <h1 class="black">{{ config.title }}</h1>
    <!-- <p>{{ config.subtitle }}</p> -->
  </div>
</template>
<style scoped>
.black{
  color:black;
  font-size: 24px;
}
.jumbotron {
  background-color: #FFD800;
}
</style>

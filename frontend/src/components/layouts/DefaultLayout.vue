<script setup>
import Header from './Header.vue';
import NavBar from './NavBar.vue';
import Footer from './Footer.vue';
</script>

<template>
  <div class="container">
    <Header />
    <NavBar />
    <div class="content">
      <slot></slot>
    </div>
    <Footer />
  </div>
</template>

<style>
.container {
  width: 402px;
  padding: 0px;

}
</style>
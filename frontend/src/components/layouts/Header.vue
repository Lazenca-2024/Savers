<script setup>
import config from '@/config';
import { ref } from 'vue';

const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <div class="jumbotron pt-2 pb-2 text-center">
    <h1 class="title">{{ config.title }}</h1>
    <!-- 햄버거 메뉴 아이콘 -->
    <div class="menu-icon" @click="toggleMenu">
      <span :class="{ open: isMenuOpen }"></span>
      <span :class="{ open: isMenuOpen }"></span>
      <span :class="{ open: isMenuOpen }"></span>
    </div>

    <!-- 메뉴 -->
    <div v-if="isMenuOpen" class="mobile-menu">
      <ul>
        <li><a href="/">메인</a></li>
        <li><a href="/Management">가계관리</a></li>
        <li><a href="/loan">대출추천</a></li>
        <li><a href="/admin">관리자전용</a></li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.jumbotron {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #FFD800;
  position: relative;
  padding: 10px;
}

.title {
  color: black;
  font-size: 24px;
  flex-grow: 1;
  text-align: center;
  margin: 0;
}

.menu-icon {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  position: absolute;
  right: 20px;
}

.menu-icon span {
  display: block;
  width: 20px;
  height: 3px;
  background-color: white;
  margin: 2px 0;
  transition: transform 0.3s, opacity 0.3s;
}

.menu-icon span.open:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}
.menu-icon span.open:nth-child(2) {
  opacity: 0;
}
.menu-icon span.open:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

.mobile-menu {
  background-color: white;
  position: absolute;
  top: 60px;
  right: 0;
  width: 200px;
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.mobile-menu ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.mobile-menu li {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.mobile-menu li a {
  color: black;
  text-decoration: none;
}
</style>

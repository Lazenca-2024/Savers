<script setup>
</script>

<template>
  <div>
    <h3 class="mt-3">관리자 전용</h3>
    <span>고객 내역 확인</span>
    
    <div class="button-container">
      <button class="user-button">김민지 님</button>
      <button class="user-button">곽민지 님</button>
      <button class="user-button">박민지 님</button>
      <button class="user-button">이민지 님</button>
    </div>
  </div>
</template>

<style scoped>
.button-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

.user-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #cce4ff; /* 연한 파란색 배경 */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: black;
}

.user-button:hover {
  background-color: #99c2ff; /* 호버 시 색상 변경 */
}
</style>

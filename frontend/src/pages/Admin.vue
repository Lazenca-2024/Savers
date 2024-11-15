<script setup>
import { ref } from "vue";

const activeButton = ref(null); // 활성화된 버튼 인덱스
const users = [
  { name: "김민지 님", details: "김민지 님의 고객 내역: 2023-10-15 구매 내역 있음." },
  { name: "곽민지 님", details: "곽민지 님의 고객 내역: 2023-10-20 방문 기록 있음." },
  { name: "박민지 님", details: "박민지 님의 고객 내역: 최근 구매 없음." },
  { name: "이민지 님", details: "이민지 님의 고객 내역: 2023-09-30 환불 처리 완료." },
];
const handleButtonClick = (buttonIndex) => {
  activeButton.value = activeButton.value === buttonIndex ? null : buttonIndex; // 클릭 시 활성화된 버튼 전환
};
</script>

<template>
  <div>
    <h3 class="mt-3">관리자 전용</h3>
    <span>고객 내역 확인</span>

    <div class="button-container">
      <div v-for="(user, index) in users" :key="index" class="user-section">
        <!-- 버튼 -->
        <button
          class="user-button"
          :class="{ active: activeButton === index }"
          @click="handleButtonClick(index)"
        >
          {{ user.name }}
        </button>

        <!-- 유저 정보 -->
        <div
          v-if="activeButton === index"
          class="user-details"
        >
          {{ user.details }}
        </div>
      </div>
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

.user-section {
  display: flex;
  flex-direction: column;
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

.user-details {
  margin-top: 10px;
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  color: #333;
  animation: fade-in 0.3s ease; /* 정보 표시 애니메이션 */
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>

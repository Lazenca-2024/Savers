<script setup>
import { ref } from "vue";

const activeButton = ref(null); // 활성화된 버튼 인덱스
const users = [
  { id: 0, name: "김민지", details: "김민지 님의 고객 내역: 2023-10-15 구매 내역 있음.", status: "연체중" },
  { id: 1, name: "곽민지", details: "곽민지 님의 고객 내역: 2023-10-20 방문 기록 있음.", status: "정상" },
  { id: 2, name: "박민지", details: "박민지 님의 고객 내역: 최근 구매 없음.", status: "정상" },
  { id: 3, name: "이민지", details: "이민지 님의 고객 내역: 2023-09-30 환불 처리 완료.", status: "연체중" },
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
          :class="{ active: activeButton === index, overdue: user.status === '연체중' }"
          @click="handleButtonClick(index)"
        >
        <span class="user-name">
            <span class="fs-large">{{ user.name }}</span><span class="suffix">&nbsp;님</span>
          </span>
          <span v-if="user.status === '연체중'" class="badge overdue-badge">연체중</span>
          <span v-if="user.status === '정상'" class="badge normal-badge">정상</span>
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #FFD800; 
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: black;
}

.suffix {
  display: inline;
  align-self: flex-end; /* '님' 텍스트를 세로 밑으로 정렬 */
}
.user-name {
  display: flex;
  align-items: center;
}

.user-button:hover {
  background-color: #ffc711; /* 호버 시 색상 변경 */
}

.user-button.overdue {
  background-color: #FF3B3E; /* 연체중 버튼 색상 */
  color: white;
}
.user-button.overdue:hover {
  background-color: #eb0004; /* 연체중 버튼 색상 */
  color: white;
}

.badge {
  display: inline-block;
  padding: 5px 12px;
  background-color: white;
  color: #FF3B3E;
  border-radius: 10px;
  font-size: 12px;
  font-weight: bold;
  width: 55px;
}

.overdue-badge {
  background-color: white;
  color: #FF3B3E;
}

.normal-badge {
  background-color: #4F83DC;
  color: white;
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

.fs-large {
  font-size: 20px; /* 사용자 이름 크기 */
}

.suffix {
  display: inline;
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

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
        <div class="info-row">
        <h5>고객정보</h5>
        <img :src="bellImage" alt="" class="bell-icon">
        </div>
          <div class="user-info">
    <div class="info-row">
      <strong>성함</strong>
      <span>{{ user.name }}</span>
    </div>
            <div class="info-row">
      <strong>전화번호</strong>
      <span>{{ user.phone }}</span>
    </div>
    <div class="info-row">
      <strong>거주지</strong>
      <span>{{ user.address }}</span>
    </div>
    <div class="info-row">
      <strong>신용등급</strong>
      <span>{{ user.credit }}</span>
    </div>
    <div class="info-row">
      <strong>총 대출 금액</strong>
      <span>{{ user.loan }}</span>
    </div>
          </div>
           <div class="subscription-section">
    <h5>가입상품</h5>
    <div class="product-list">
      <div
        v-for="(product, index) in products"
        :key="index"
        class="product-item"
      >
        <div class="product-details">
          <p class="product-title">{{ product.title }}</p>
          <p class="product-subtitle">{{ product.subtitle }}</p>
        </div>
        <div>
      </div>
      </div>
    </div>
    <h5>고객정보</h5>
    <div class="loan-status">
    <div class="loan-header">
      <h3>{{ loanInfo.title }}</h3>
    </div>
    <div class="loan-details">
      <div class="loan-amount">
        <p>대출 금액</p>
        <div class="loam"><strong>{{ formatCurrency(loanInfo.amount) }}</strong></div>
      </div>
      <div class="progress-bar">
        <div class="progress" :style="{ width: progressPercentage + '%' }"></div>
      </div>
      <div class="loan-meta">
        <div>
          <span>신청일</span>
          <span>{{ loanInfo.startDate }}</span>
        </div>
        <div>
          <span>만기일</span>
          <span>{{ loanInfo.endDate }}</span>
        </div>
      </div>
      <div class="loan-extra">
        <div class="loex">
          <span>적용 금리</span>
          <span class="lospan">연 {{ loanInfo.interestRate }}%</span>
        </div>
        <div class="loex">
          <span>만기일</span>
          <span class="lospan">{{ loanInfo.endDate }}%</span>
        </div>
        <div class="loex">
          <span>상환 회차</span>
          <span class="lospan">{{ loanInfo.repaymentCount }}회</span>
        </div>
        <div class="loex">
          <span>대출 잔액</span>
          <span class="lospan">{{ formatCurrency(loanInfo.remainingBalance) }}</span>
        </div>
      </div>
    </div>
  </div>
  </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script setup>
import { ref } from "vue";
import bellImage from '@/assets/images/bell.png';

const activeButton = ref(null); // 활성화된 버튼 인덱스
const users = [
  { id: 0, name: "김민지", phone: "010-1234-5678", address: "서울특별시 송파구", credit: "2등급", loan: "50,000,000 원", status: "연체중" },
  { id: 1, name: "곽민지", phone: "010-5678-1234", address: "경기도 성남시", credit: "1등급", loan: "30,000,000 원", status: "정상" },
  { id: 2, name: "박민지", phone: "010-3456-7890", address: "부산광역시 해운대구", credit: "3등급", loan: "20,000,000 원", status: "정상" },
  { id: 3, name: "이민지", phone: "010-0987-6543", address: "서울특별시 광진구", credit: "1등급", loan: "100,000,000 원", status: "연체중" },
];

const products = [
  {
    title: "KB 사장님 + 마이너스통장",
    subtitle: "개인사업자 | 최대 1억원 | 4.26%",
  },
  {
    title: "KB소상공인 신용대출",
    subtitle: "개인사업자 | 최대 1억원 | 4.26%",
  },
];

const handleButtonClick = (buttonIndex) => {
  activeButton.value = activeButton.value === buttonIndex ? null : buttonIndex; // 클릭 시 활성화된 버튼 전환
};

const loanInfo = ref({
  title: "KB 사장님 + 마이너스통장",
  amount: 100000000, // 대출 금액
  startDate: "2023.11.20", // 신청일
  endDate: "2024.11.20", // 만기일
  interestRate: 4.26, // 적용 금리
  repaymentCount: 5, // 상환 회차
  remainingBalance: 400000000, // 대출 잔액
});

// 상환 진행률 계산 (잔액을 기준으로 100% - 잔액 비율)
const progressPercentage = ((loanInfo.value.amount - loanInfo.value.remainingBalance) / loanInfo.value.amount) * 100;

// 통화 형식 변환 함수
const formatCurrency = (value) => {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
  }).format(value);
};

</script>

<style scoped>
.button-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
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
  border-radius: 8px;
  cursor: pointer;
  color: black;
}

.user-button:hover {
  background-color: #ffc711;
}

.user-button.overdue {
  background-color: #FF3B3E;
  color: white;
}

.user-button.overdue:hover {
  background-color: #eb0004;
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
  text-align: center;
}

.normal-badge {
  background-color: #4F83DC;
  color: white;
}

.user-details {
  margin-top: 10px;
  padding: 15px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  animation: fade-in 0.3s ease;
}

.user-info {
  background: white;
  border-radius: 8px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.info-row strong {
  font-weight: bold;
}

.info-row span {
  text-align: right;
}

.fs-large {
  font-size: 20px;
  font-weight: bold;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.bell-icon {
  width: 30px;
  height: 30px;
  object-fit: contain; /* 이미지 비율 유지 */
}


.product-list {
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: #ffffff;
  margin-bottom: 10px;
}

.product-item {
  display: flex;
  align-items: center;
  padding: 10px;
}

.product-index {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.product-details {
  flex: 1;
}

.product-title {
  font-size: 16px;
  font-weight: bold;
  color: #000000;
  margin: 0;
}

.product-subtitle {
  font-size: 14px;
  color: #888888;
  margin: 0;
}


.loan-status {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  font-family: "Arial", sans-serif;
}

.loan-header h3 {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.loan-details {
  display: flex;
  flex-direction: column;
}

.loan-amount {
  justify-content: space-between;
  font-size: 16px;
  font-weight: bold;
}

.loan-amount p{
  margin: 0;
  color: #888888;
}

.loam {

}

.progress-bar {
  background-color: #f5f5f5;
  height: 10px;
  border-radius: 5px;
  overflow: hidden;
  margin: 10px 0 10px 0;
}

.progress-bar .progress {
  height: 100%;
  background-color: #ff0000; /* 빨간색 */
}

.loan-meta {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.loan-extra {
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 14px;
  color: #666;
}

.loex {
  display: flex;
  justify-content: space-between;
}

.lospan {
  font-weight: bold;
  color: black;
}

.loan-meta span:first-child,
.loan-extra span:first-child {
  font-weight: bold;
}

</style>

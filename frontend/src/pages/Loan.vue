<template>
  <div class="mt-3">
    <!-- 검색 입력 필드 및 버튼 -->
    <div class="search-container">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="대출 상품 검색..."
        class="search-input"
      />
      <button @click="performSearch" class="search-button">검색</button>
    </div>

    <div v-for="loan in paginatedLoans" :key="loan.title" class="loan-card" @click="goToLoanPage(loan.link)">
      <div class="loan-card-header">
        <h4 class="loan-title">{{ loan.title }}</h4>
        <span class="loan-rate">{{ loan.interestRate }}</span>
      </div>
      <p class="loan-description">{{ loan.description }}</p>
    </div>

    <!-- 페이지네이션 -->
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1" class="pagination-button">◀ 이전</button>
      <span class="page-info">{{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="pagination-button">다음 ▶</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const loans = ref([
  { title: 'KB 사장님 대출상품', interestRate: '4.5%', description: '사장님, 필요한만큼 사용하고 언제든 상환하세요.', link: 'https://obiz.kbstar.com/quics?page=C016280#CP' },
  { title: '우리사 대출상품', interestRate: '3.9%', description: '빠른 심사로 언제든지 자금을 지원받을 수 있습니다.', link: 'https://obiz.kbstar.com/quics?page=C016280#CP' },
  { title: '하나사 대출상품', interestRate: '5.0%', description: '실속 있는 금리로 안정적인 자금 운용이 가능합니다.', link: 'https://obiz.kbstar.com/quics?page=C016280#CP' },
  { title: '농협 대출상품', interestRate: '4.0%', description: '기존 대출금 상환 시 혜택이 있는 상품입니다.', link: 'https://obiz.kbstar.com/quics?page=C016280#CP' },
  // 나머지 상품들을 추가...
]);

const currentPage = ref(1);
const itemsPerPage = 5;  // 한 페이지에 표시할 대출 상품 개수
const searchQuery = ref(''); // 검색어 상태
const filteredLoans = ref(loans.value); // 초기 필터링된 대출 상품

const totalPages = computed(() => {
  return Math.ceil(filteredLoans.value.length / itemsPerPage);
});

const paginatedLoans = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredLoans.value.slice(start, end);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const performSearch = () => {
  currentPage.value = 1; // 검색 후 첫 페이지로 리셋
  filteredLoans.value = loans.value.filter(loan => {
    return loan.title.toLowerCase().includes(searchQuery.value.toLowerCase());
  });
};

const goToLoanPage = (link) => {
  window.open(link, '_blank');  // 클릭한 대출 상품의 링크를 새 탭에서 열기
};
</script>

<style scoped>
/* 카드 디자인 */
.loan-card {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;  /* 클릭할 수 있다는 포인터 효과 추가 */
}

.loan-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.loan-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.loan-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.loan-rate {
  font-size: 16px;
  font-weight: 500;
  color: #FF9900;
}

.loan-description {
  font-size: 14px;
  color: #555;
  line-height: 1.5;
}

/* 페이지네이션 스타일 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}

.pagination-button {
  background-color: #2391FF;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
  margin: 0 10px;
}

.pagination-button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

.pagination-button:hover {
  background-color: #52a9ff;
}

.page-info {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

/* 검색 입력 스타일 */
.search-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.search-input {
  padding: 10px;
  border: 1px solid #ccc;
  width: 80%; /* 원하는 너비로 수정 가능 */
  font-size: 16px;
}

.search-button {
  padding: 10px 20px;
  border: none;
  background-color: #4C70AD;
  color: white;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.search-button:hover {
  background-color: #4F83DC;
}
</style>

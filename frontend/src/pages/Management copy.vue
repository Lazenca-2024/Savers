<template>
  <div class="container">
    <div class="title">가게 관리</div>
    <div class="subtitle">나의 재정 상태를 관리해 보세요</div>
    <div style="display:flex">
    <div class="me-2">지출 예정 금액</div>
    <div class="highlight">일시상환</div>
    </div>
    <div class="amount">590,000 원</div>

    <div class="chart-section">
      <div class="chart-title">남은 상환 기간 중 어떤 방식이 가장 좋을까요?</div>
      <div class="chart">
      </div>
    </div>

    <div class="chart-section">
      <div class="chart-title">ㅇㅇㅇ님의 월별 지출 내역이에요</div>
      <div class="chart">
      </div>
    </div>

    <div class="aerea">
      <div class="expense-title">고정 지출 비용</div>
      <div class="expense-amount">150,000 원</div>
    </div>

    <div class="aerea">
      <div class="expense-title">저축 비용</div>
      <div class="expense-amount">150,000 원</div>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
.container {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 0 auto;
}

.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5px;
}

.subtitle {
  font-size: 14px;
  color: #777;
  margin-bottom: 15px;
}

.highlight {
  display: inline-block;
  background-color: #FFD800;
  font-size: 12px;
  padding: 3px 8px;
  border-radius: 12px;
  margin-bottom: 10px;
  font-weight: bold;
}

.amount {
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin: 5px 0 20px 0;
}

.chart-section, .monthly-expense {
  margin-bottom: 20px;
}

.chart-title {
  font-size: 14px;
  margin-bottom: 10px;
  color: #555;
}

.chart {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  height: 200px;
  margin-bottom: 10px;
  background-color: #F8F8F8;
  border-radius: 15px;
}

.aerea{
  background-color: #F8F8F8;
  border-radius: 15px;
  margin-bottom: 20px;
  padding: 10px;
}

.expense-amount {
  font-size: 18px;
  color: #333;
  font-weight: bold;
  padding: 10px 0;
}
</style>

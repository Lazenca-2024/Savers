<template>
  <div class="container">
    <div class="title">가게 관리</div>
    <div class="subtitle">나의 재정 상태를 관리해 보세요</div>
    <div style="display:flex">
    <div class="me-2">지출 예정 금액</div>
    <div class="highlight">일시상환</div>
    </div>
    <div class="amount">{{ amount.toLocaleString() }} 원</div>

    <div class="chart-section">
      <div class="chart-title">남은 상환 기간 중 어떤 방식이 가장 좋을까요?</div>
      <div class="chart">
        <div
          v-for="(option, index) in repaymentOptions"
          :key="index"
          class="bar"
          :style="{ height: option.height + 'px', backgroundColor: option.color }"
        >
          <p>{{ option.label }}</p>
          <p>{{ option.amount.toLocaleString() }}만원</p>
        </div>
      </div>
    </div>

    <div class="monthly-expense">
      <div class="chart-title">○○○님의 월별 지출 내역이에요</div>
      <div class="chart">
        <div
          v-for="(expense, index) in monthlyExpenses"
          :key="index"
          class="bar"
          :style="{ height: expense.height + 'px' }"
        >
          <p>{{ expense.month }}월</p>
          <p>{{ expense.amount.toLocaleString() }}만원</p>
        </div>
      </div>
    </div>

    <div class="fixed-cost">
      <div class="expense-title">고정 지출 비용</div>
      <div class="expense-amount">{{ fixedCost.toLocaleString() }} 원</div>
    </div>

    <div class="savings">
      <div class="expense-title">저축 비용</div>
      <div class="expense-amount">{{ savings.toLocaleString() }} 원</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      amount: 590000,
      repaymentOptions: [
        { label: '일시상환', amount: 123, height: 60, color: '#ffb3b3' },
        { label: '원금균등상환', amount: 560, height: 100, color: '#d9d9ff' },
        { label: '원리금균등상환', amount: 1203, height: 120, color: '#d9d9ff' }
      ],
      monthlyExpenses: [
        { month: 7, amount: 41, height: 40 },
        { month: 8, amount: 72, height: 70 },
        { month: 9, amount: 30, height: 30 },
        { month: 10, amount: 50, height: 50 }
      ],
      fixedCost: 150000,
      savings: 150000
    };
  }
};
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

.chart-section, .monthly-expense, .fixed-cost, .savings {
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
  height: 120px;
  margin-bottom: 10px;
}

.bar {
  width: 20%;
  border-radius: 4px;
  text-align: center;
  color: #333;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 5px;
}

.expense-title {
  font-size: 14px;
  color: #777;
  margin-bottom: 5px;
}

.expense-amount {
  font-size: 18px;
  color: #333;
  font-weight: bold;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}
</style>

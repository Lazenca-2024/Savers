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
        <div v-for="(data, index) in chartData" :key="index" class="bar-container">
          <div style="height: 100%">
            <div :style="{ height: (100-data.value) + '%'}"></div>
          <div
            class="bar"
            :style="{ height: data.value + '%', backgroundColor: data.color }"
          >
          </div>
          </div>
          <div class="label">{{ data.label }}</div>
          <div class="value">{{ data.amount }}</div>
        </div>
      </div>
    </div>

    <div class="chart-section">
      <div class="chart-title">ㅇㅇㅇ님의 월별 지출 내역이에요</div>
      <div class="chart">
        <div v-for="(data, index) in chartDataM" :key="index" class="bar-container">
          <div style="height: 100%">
            <div :style="{ height: (100-data.value) + '%'}"></div>
          <div
            class="bar"
            :style="{ height: data.value + '%', backgroundColor: data.color }"
          >
          </div>
          </div>
          <div class="label">{{ data.label }}</div>
          <div class="value">{{ data.amount }}</div>
        </div>
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
export default {
  data() {
    return {
      chartData: [
        { label: "일시상환", amount: "123만원", value: 20, color: "#ff80ab" },
        { label: "원금균등상환", amount: "560만원", value: 60, color: "#42a5f5" },
        { label: "원리금균등상환", amount: "1203만원", value: 100, color: "#1e88e5" },
      ],
      chartDataM: [
        { label: "7월", amount: "41만원", value: 60, color: "#ff80ab" },
        { label: "8월", amount: "72만원", value: 100, color: "#42a5f5" },
        { label: "9월", amount: "30만원", value: 40, color: "#1e88e5" },
        { label: "10월", amount: "59만원", value: 70, color: "#1e88e5" },
      ],
    };
  },
};
</script>

<style scoped>
.container {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 20px;
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
  padding: 10px;
}

.aerea {
  background-color: #F8F8F8;
  border-radius: 15px;
  margin-bottom: 20px;
  padding: 25px;
}

.expense-title{
  font-size: 20px;
}

.expense-amount {
  font-size: 25px;
  color: #333;
  font-weight: bold;
}

.bar-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bar {
  width: 40px;
  border-radius: 8px;
  transition: height 0.3s ease;
}

.label {
  margin-top: 10px;
  font-size: 14px;
  text-align: center;
  font-weight: bold;
}

.value {
  font-size: 14px;
  color: #757575;
}
</style>

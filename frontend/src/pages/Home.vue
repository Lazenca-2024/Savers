<template>
  <!-- 채팅 -->
  <div class="chat-container">
    <div v-for="(message, index) in messages" :key="index" :class="['message', message.type]">
      <!-- AI 아이콘 -->
      <div v-if="message.type === 'bot'" class="bot-icon">🤖</div>
      <!-- 일반 메시지 -->
      <p v-if="message.type !== 'options'">{{ message.text }}</p>
      <!-- 질문 추천 리스트 -->
      <div v-else class="options">
        <button v-for="(option, i) in message.options" :key="i">{{ option }}</button>
      </div>
    </div>
  </div>

  <!-- 입력칸 -->
  <div class="input-section">
    <input v-model="userInput" placeholder="입력해 주세요." @keyup.enter="sendMessage" />
    <button @click="sendMessage">전송</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const messages = ref([
  { type: 'bot', text: '안녕하세요, 고객님!\n세이버스 AI 상담사입니다.\n\n원활한 상담을 위해\n고객님의 성함과\n가게 창업 여부를 알려주세요.' },
  { type: 'user', text: '박민지, 굽네치킨 창업을 준비중이야.' },
  { type: 'bot', text: '치킨 창업을 준비하고 계시군요.\n무엇을 도와드릴까요?\n\n아래는 치킨 창업을 준비하는\n청년 자영업자분들이\n가장 궁금해하는 질문이에요.' },
  { type: 'options', options: ['가장 인기있는 대출 상품', '가장 이자율이 싼 대출 상품', '돈을 가장 빨리 모을 수 있는 방법'] },
  { type: 'user', text: '돈이 부족한데 어떤 대출상품이 가장 좋을지 추천해줘.' },
  { type: 'bot', text: 'KB 사장님 대출상품을 추천드려요.\n\n20대 자영업자 분들이 가장 많이 선택한 대출상품이에요.' },
]);

const userInput = ref("");

const sendMessage = () => {
  if (userInput.value.trim()) {
    messages.value.push({ type: 'user', text: userInput.value });
    userInput.value = "";
  }
};
</script>

<style scoped>
.chat-container {
  padding: 10px;
  background-color: white;
  height: calc(100vh - 200px); /* 컨테이너 높이 설정 */
  overflow-y: scroll; /* 스크롤 활성화 */
  white-space: pre-line; /* 줄바꿈을 적용하기 위한 스타일 */
}

/* Webkit 기반 브라우저용 커스텀 스크롤바 */
.chat-container::-webkit-scrollbar {
  width: 6px; /* 스크롤바의 폭 (얇게 설정) */
}

.chat-container::-webkit-scrollbar-thumb {
  background-color: #FFD800; /* 노란색 */
  border-radius: 20px; /* 둥근 스크롤바 */
}

.chat-container::-webkit-scrollbar-track {
  background-color: transparent; /* 배경을 투명하게 설정 */
}
.message {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.message.bot {
  justify-content: flex-start;
  margin-bottom: 0; /* 기본 margin-bottom 제거 */
}
.message.user {
  justify-content: flex-end;
}
.bot-icon {
  background-color: #4CAF50;
  color: white;
  border-radius: 50%;
  padding: 5px;
  margin-right: 10px;
}
.message p {
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 10px;
  max-width: 70%;
  word-wrap: break-word;
}
.options {
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 15px;
}
.options button {
  background-color: #FFD800;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  margin-right: 62px;
}

.input-section {
  display: flex;
  align-items: center;
  padding: 10px;
  border-top: 1px solid #ddd;
}
.input-section input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.input-section button {
  margin-left: 10px;
  padding: 10px;
  background-color: #FFD800;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>

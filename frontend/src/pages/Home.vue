<template>
  <!-- 채팅 -->
  <div class="chat-container">
    <div v-for="(message, index) in messages" :key="index" class="message" :class="{'user-message': !message.isBot, 'bot-message': message.isBot}">
      <div v-if="message.isBot">
        <div class="bot-icon">🤖</div>
        </div>
      <!-- AI 메시지 -->
      <div v-if="message.isBot">
        <p style="white-space: pre-line;">{{ message.content }}</p>
        <!-- 옵션 (사용자 선택을 위한 버튼) -->
        <div v-if="message.option && message.option.length > 0" class="options">
          <button v-for="(option) in message.option" :key="option.option_id" @click="handleOptionClick(option)">
            {{ option.content }}
          </button>
        </div>
      </div>
      <!-- 사용자 메시지 -->
      <div v-else>
        <p style="white-space: pre-line; text-align: right;">{{ message.content }}</p>
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
import { ref } from "vue";
import questions from "/src/api/structured_question.json"; // JSON 파일을 import

const messages = ref([]); // 메시지 데이터
const userInput = ref(""); 
const currentQuestionIndex = ref(0); // 현재 질문의 인덱스

// 메시지 초기화
const initializeChat = () => {
  const firstQuestion = questions[0];
  if (firstQuestion) {
    messages.value.push({
      isBot: true, // AI 메시지는 isBot 속성으로 구분
      content: firstQuestion.content,
      option: firstQuestion.option || [],
    });
  }
};

// 메시지 전송
const sendMessage = () => {
  if (userInput.value.trim()) {
    messages.value.push({
      isBot: false, // 사용자 메시지는 isBot을 false로 설정
      content: userInput.value,
    });
    userInput.value = "";

    // 다음 질문으로 이동
    const nextQuestionId =
      questions[currentQuestionIndex.value]?.option?.[0]?.next_question_id;
    if (nextQuestionId !== undefined) {
      const nextQuestion = questions.find(
        (q) => q.question_id === nextQuestionId
      );
      if (nextQuestion) {
        messages.value.push({
          isBot: true, // 다음 질문은 AI 메시지로 isBot을 true로 설정
          content: nextQuestion.content,
          option: nextQuestion.option || [],
        });
        currentQuestionIndex.value = questions.indexOf(nextQuestion);
      }
    }
  }
};

// 옵션 선택 처리
const handleOptionClick = (option) => {
  if (option.next_question_id) {
    const nextQuestion = questions.find(
      (q) => q.question_id === option.next_question_id
    );
    if (nextQuestion) {
      messages.value.push({
        isBot: true, // 옵션 선택 후의 질문도 AI 메시지로 설정
        content: nextQuestion.content,
        option: nextQuestion.option || [],
      });
      currentQuestionIndex.value = questions.indexOf(nextQuestion);
    }
  }
};

// 초기화
initializeChat();
</script>

<style scoped>
.chat-container {
  padding: 10px;
  background-color: white;
  height: calc(100vh - 200px); /* 컨테이너 높이 설정 */
  overflow-y: scroll; /* 스크롤 활성화 */
}

/* Webkit 기반 브라우저용 커스텀 스크롤바 */
.chat-container::-webkit-scrollbar {
  width: 6px; /* 스크롤바의 폭 (얇게 설정) */
}

.chat-container::-webkit-scrollbar-thumb {
  background-color: #FFD800; /* 노란색 */
  border-radius: 20px; /* 둥근 스크롤바 */
}

.message {
  display: flex;
  align-items: flex-start; /* 상단 정렬 */
  margin-bottom: 10px;
}

.message p {
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 10px;
  max-width: 70%;
  word-wrap: break-word;
}

.bot-message {
  justify-content: flex-start; /* AI 메시지는 왼쪽 정렬 */
}

.user-message {
  justify-content: flex-end; /* 사용자 메시지는 오른쪽 정렬 */
}

.bot-icon {
  font-size: 30px; /* 아이콘 크기 키우기 */
  margin-right: 10px;
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

<template>
  <!-- 채팅 -->
  <div class="chat-container">
    <div v-for="(message, index) in messages" :key="index" class="message" :class="{'user-message': !message.isBot, 'bot-message': message.isBot}">
      <div v-if="message.isBot">
        <div class="bot-icon">🤖</div>
        <!-- AI 메시지 -->
        <div v-if="message.isBot">
          <p style="white-space: pre-line;">{{ message.content }}</p>
          <!-- 옵션 (사용자 선택을 위한 버튼) -->
          <div v-if="message.option && message.option.length > 0 && message.check == true" class="d-options">
            <label v-for="(option) in message.option" :key="option.option_id" class="option-wrapper">
              <input 
                type="checkbox" 
                :value="option.option_id" 
                v-model="selectedOptions" 
                @click.stop
              />
              {{ option.content }}
            </label>
            <!-- 선택완료 버튼 -->
            <div class="complete-section">
              <button @click="completeSelection">선택완료</button>
            </div>
          </div>

          <div v-else class="options">
            <button v-for="(option) in message.option" :key="option.option_id" @click="handleOptionClick(option)">
              {{ option.content }}
            </button>
          </div>
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
const answeredQuestions = ref(new Set()); // 응답한 question_id를 저장하는 Set
const showCompleteButton = ref(false); // "선택완료" 버튼 표시 여부

const selectedOptions = ref([]); // 체크된 항목의 값들을 저장할 배열
const questionQueue = ref([]); // 후속 질문들을 저장할 큐

// 메시지 초기화
const initializeChat = () => {
  const firstQuestion = questions[0];
  if (firstQuestion) {
    messages.value.push({
      isBot: true, // AI 메시지는 isBot 속성으로 구분
      content: firstQuestion.content,
      option: firstQuestion.option || [],
      check: firstQuestion.check || false, // check 속성 추가
    });
  }
};

// 메시지 전송 처리
const sendMessage = () => {
  if (userInput.value.trim()) {
    messages.value.push({
      isBot: false, // 사용자 메시지는 isBot을 false로 설정
      content: userInput.value,
    });
    userInput.value = "";

    // 질문에 응답 후 후속 질문 처리
    if (questionQueue.value.length > 0) {
      const nextQuestion = questionQueue.value.shift(); // 큐에서 질문을 하나 꺼냄
      messages.value.push({
        isBot: true,
        content: nextQuestion.content,
        option: nextQuestion.option || [],
        question_id: nextQuestion.question_id,
        check: nextQuestion.check || false,
      });
      currentQuestionIndex.value = questions.indexOf(nextQuestion); // 다음 질문으로 이동
    }
  }
};
// 후속 질문 로딩 함수
const loadNextQuestion = (nextQuestionId) => {
  const nextQuestion = questions.find(q => q.question_id === nextQuestionId);
  if (nextQuestion) {
    messages.value.push({
      isBot: true,
      content: nextQuestion.content,
      option: nextQuestion.option || [],
      question_id: nextQuestion.question_id,
      check: nextQuestion.check || false,
    });
    currentQuestionIndex.value = questions.indexOf(nextQuestion);
  }
};

// 옵션 선택 처리
const handleOptionClick = (option) => {
  if (option.next_question_id) {
    handleQuestionCompletion(option.next_question_id); // 응답 처리
    const nextQuestion = questions.find(
      (q) => q.question_id === option.next_question_id
    );
    if (nextQuestion) {
      messages.value.push({
        isBot: true, // 옵션 선택 후의 질문도 AI 메시지로 설정
        content: nextQuestion.content,
        option: nextQuestion.option || [],
        check: nextQuestion.check || false,
      });
      currentQuestionIndex.value = questions.indexOf(nextQuestion);
    }
  }
};

// 질문 응답 처리
const handleQuestionCompletion = (questionId) => {
  answeredQuestions.value.add(questionId);
  // 질문 ID가 2개 이상이면 "선택완료" 버튼 표시
  if (answeredQuestions.value.size >= 2) {
    showCompleteButton.value = true;
  }
};

// 선택 완료 처리
const completeSelection = () => {
  console.log("선택된 옵션 값들:", selectedOptions.value);

  // 각 선택된 옵션에 대해 후속 질문을 큐에 추가
  selectedOptions.value.forEach(optionId => {
    const selectedOption = questions
      .find(question => question.question_id === 2) // question_id가 2인 질문을 찾습니다.
      ?.option
      .find(option => option.option_id === optionId); // 선택된 option_id로 해당 옵션을 찾기

    // 후속 질문이 있으면 큐에 추가
    if (selectedOption && selectedOption.next_question_id) {
      const nextQuestion = questions.find(
        (q) => q.question_id === selectedOption.next_question_id
      );
      if (nextQuestion) {
        questionQueue.value.push(nextQuestion); // 후속 질문 큐에 추가
      }
    }
  });

  // 큐에 질문이 있으면 첫 번째 후속 질문을 표시
  if (questionQueue.value.length > 0) {
    const nextQuestion = questionQueue.value.shift();
    messages.value.push({
      isBot: true,
      content: nextQuestion.content,
      option: nextQuestion.option || [],
      question_id: nextQuestion.question_id,
      check: nextQuestion.check || false,
    });
    currentQuestionIndex.value = questions.indexOf(nextQuestion);
  }

  // 상태 초기화
  selectedOptions.value = [];
  showCompleteButton.value = false;
  answeredQuestions.value.clear();
};



// 초기화
initializeChat();

</script>

<style scoped>
/* 스타일링은 그대로 유지 */
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

.complete-section {
  text-align: center;
  margin-top: 20px;
}

.complete-section button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.d-options {
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 15px;
  text-align: center;
}

.option-wrapper {
  background-color: #FFD800;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  margin-right: 62px;
  display: flex; /* 플렉스 박스로 변경 */
  align-items: center; /* 수직 중앙 정렬 */
  justify-content: flex-start; /* 체크박스와 텍스트를 왼쪽부터 배치 */
  gap: 10px; /* 체크박스와 텍스트 사이의 간격 */
  text-align: center; /* 텍스트 중앙 정렬 */
}
</style>

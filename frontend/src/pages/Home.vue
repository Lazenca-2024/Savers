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
        <button v-for="(option, i) in message.options" :key="i" @click="handleOptionClick(option)">{{ option }}</button>
      </div>
    </div>
  </div>

  <!-- 입력칸 -->
  <div class="input-section">
    <input v-model="userInput" placeholder="입력해 주세요." @keyup.enter="sendMessage" />
    <button @click="sendMessage">전송</button>
  </div>

  <!-- 지도 -->
  <div id="map" class="map-container" v-if="mapVisible"></div>
</template>

<script setup>
import { ref } from 'vue';

const messages = ref([
  { type: 'bot', text: '안녕하세요, 고객님!\n세이버스 AI 상담사입니다.\n\n원활한 상담을 위해\n고객님의 성함과\n가게 창업 여부를 알려주세요.' },
  { type: 'user', text: '박민지, 굽네치킨 창업을 준비중이야.' },
  { type: 'bot', text: '치킨 창업을 준비하고 계시군요.\n무엇을 도와드릴까요?\n\n아래는 치킨 창업을 준비하는\n청년 자영업자분들이\n가장 궁금해하는 질문이에요.' },
  { type: 'options', options: ['가장 인기있는 대출 상품', '가장 이자율이 싼 대출 상품', '돈을 가장 빨리 모을 수 있는 방법', '내 주변 KB국민은행 영업점 찾기'] },
  { type: 'user', text: '돈이 부족한데 어떤 대출상품이 가장 좋을지 추천해줘.' },
  { type: 'bot', text: 'KB 사장님 대출상품을 추천드려요.\n\n20대 자영업자 분들이 가장 많이 선택한 대출상품이에요.'},
  
]);

const userInput = ref("");
const mapVisible = ref(false); // 지도의 가시성 상태를 저장하는 ref
const places = ref([]); // 영업점 정보를 저장하는 ref

const sendMessage = () => {
  if (userInput.value.trim()) {
    messages.value.push({ type: 'user', text: userInput.value });
    userInput.value = "";
  }
};

const handleOptionClick = (option) => {
  if (option === '내 주변 KB국민은행 영업점 찾기') {
    getLocation();
  }
};

// 사용자의 위치 정보를 가져오는 함수
const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    messages.value.push({ type: 'bot', text: '죄송합니다. 위치 정보를 가져올 수 없습니다.' });
  }
};

// 위치 정보를 기반으로 영업점 정보를 보여주는 함수
const showPosition = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  // 카카오맵 API를 호출하여 주변 영업점 검색
  const apiKey = import.meta.env.VITE_KAKAO_API_URL;

  const url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=KB국민은행&y=${latitude}&x=${longitude}&radius=1000`; // 1km 이내의 영업점 검색

  fetch(url, {
    headers: {
      Authorization: `KakaoAK ${apiKey}`
    }
  })
    .then(response => response.json())
    .then(data => {
      if (data && data.documents && data.documents.length > 0) {
        const places = data.documents;
        let placeList = '주변 KB국민은행 영업점을 안내해 드릴게요.\n';
        places.forEach(place => {
          placeList += `${place.place_name} (${place.road_address_name})\n`;
        });
        messages.value.push({ type: 'bot', text: placeList });
      } else {
        // 주변 영업점이 없을 경우
        messages.value.push({ type: 'bot', text: '주변에 KB국민은행 영업점이 없습니다.' });
      }
    })
    .catch(error => {
      messages.value.push({ type: 'bot', text: '영업점 정보를 가져오는 중 오류가 발생했습니다.' });
      console.error('Error fetching data: ', error);
    });
};


// 위치 정보 가져오기 실패 시 호출되는 함수
const showError = (error) => {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      messages.value.push({ type: 'bot', text: '위치 정보 접근이 거부되었습니다.' });
      break;
    case error.POSITION_UNAVAILABLE:
      messages.value.push({ type: 'bot', text: '위치 정보를 사용할 수 없습니다.' });
      break;
    case error.TIMEOUT:
      messages.value.push({ type: 'bot', text: '위치 정보 요청이 시간 초과되었습니다.' });
      break;
    case error.UNKNOWN_ERROR:
      messages.value.push({ type: 'bot', text: '알 수 없는 오류가 발생했습니다.' });
      break;
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

<script setup>
import { ref, computed, nextTick, onMounted } from 'vue';
import authService from '../services/auth.service';
import aiService from '../services/ai.service';

const userName = computed(() => {
  const user = authService.getUser();
  const fullName = user?.fullName || user?.username || 'Гость';
  const parts = fullName.split(' ');
  return parts[1] || parts[0];
});

const messages = ref([]);
const inputMessage = ref('');
const loading = ref(false);
const chatContainer = ref(null);
const conversationHistory = ref([]);
const contextData = ref('');

onMounted(async () => {
  console.log('✅ AI готов к работе (без внешних источников)');
  contextData.value = '';
});

const sendMessage = async () => {
  if (!inputMessage.value.trim() || loading.value) return;

  const userMsg = inputMessage.value.trim();
  messages.value.push({ text: userMsg, isUser: true });
  conversationHistory.value.push({ role: 'user', content: userMsg });
  inputMessage.value = '';
  loading.value = true;

  await nextTick();
  scrollToBottom();

  try {
    const response = await aiService.sendMessage(
      userMsg, 
      conversationHistory.value.slice(-10),
      contextData.value
    );
    
    console.log('🤖 AI ответ:', response);
    
    if (response.success) {
      messages.value.push({ text: response.message, isUser: false });
      conversationHistory.value.push({ role: 'assistant', content: response.message });
    } else {
      messages.value.push({ 
        text: `Ошибка: ${response.error}. Проверьте настройки API ключа.`, 
        isUser: false,
        isError: true
      });
    }
  } catch (error) {
    messages.value.push({ 
      text: 'Произошла ошибка при отправке сообщения.', 
      isUser: false,
      isError: true
    });
  } finally {
    loading.value = false;
    await nextTick();
    scrollToBottom();
  }
};

const scrollToBottom = () => {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
};
</script>

<template>
  <div :class="$style.aiPage">
    <div :class="$style.content">
      <div :class="$style.header">
        <h2 :class="$style.greeting">Привет, {{ userName }}!</h2>
        <h1 :class="$style.title">Чем могу помочь?</h1>
      </div>

      <div :class="$style.chatContainer" ref="chatContainer">
        <div v-for="(msg, index) in messages" :key="index" 
             :class="[$style.message, msg.isUser ? $style.userMessage : $style.aiMessage]">
          <div :class="$style.messageText">{{ msg.text }}</div>
        </div>

        <div v-if="loading" :class="[$style.message, $style.aiMessage]">
          <div :class="$style.typingIndicator">
            <span></span><span></span><span></span>
          </div>
        </div>
      </div>

      <div :class="$style.inputWrapper">
        <input 
          v-model="inputMessage"
          @keyup.enter="sendMessage"
          :class="$style.input"
          placeholder="Вопрос"
          :disabled="loading"
        />
        <button @click="sendMessage" :class="$style.sendBtn" :disabled="loading || !inputMessage.trim()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style module>
.aiPage {
  width: 100%;
  min-height: 100vh;
  background: #e8e8e8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter',Rubik, sans-serif;
  padding: 20px;
}

.content {
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

.header {
  text-align: center;
}

.greeting {
  font-size: 24px;
  font-weight: 400;
  margin: 0 0 10px 0;
  color: #000;
}

.title {
  font-size: 48px;
  font-weight: 700;
  margin: 0;
  color: #000;
}

.chatContainer {
  width: 100%;
  max-height: 400px;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.message {
  display: flex;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.userMessage {
  justify-content: flex-end;
}

.aiMessage {
  justify-content: flex-start;
}

.messageText {
  padding: 12px 20px;
  border-radius: 20px;
  max-width: 70%;
  word-wrap: break-word;
  font-size: 16px;
}

.userMessage .messageText {
  background: #d90135;
  color: white;
}

.aiMessage .messageText {
  background: white;
  color: #000;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.typingIndicator {
  display: flex;
  gap: 5px;
  padding: 12px 20px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.typingIndicator span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #999;
  animation: bounce 1.4s infinite;
}

.typingIndicator span:nth-child(2) { animation-delay: 0.2s; }
.typingIndicator span:nth-child(3) { animation-delay: 0.4s; }

@keyframes bounce {
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-10px); }
}

.inputWrapper {
  width: 100%;
  max-width: 700px;
  display: flex;
  gap: 10px;
  align-items: center;
}

.input {
  flex: 1;
  padding: 16px 24px;
  border: none;
  border-radius: 50px;
  font-size: 16px;
  outline: none;
  background: white;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  font-family: 'Inter', sans-serif;
  font-style: italic;
  color: #999;
}

.input:focus {
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
  color: #000;
  font-style: normal;
}

.input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.sendBtn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background: #888;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.sendBtn:hover:not(:disabled) {
  background: #666;
  transform: scale(1.05);
}

.sendBtn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .greeting { font-size: 20px; }
  .title { font-size: 36px; }
  .messageText { max-width: 85%; }
  .chatContainer { max-height: 300px; }
}
</style>

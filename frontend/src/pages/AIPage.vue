<script setup>
import { ref, computed, nextTick } from 'vue';
import authService from '../services/auth.service';
import aiService from '../services/ai.service';
import i18n from '../i18n';

const userName = computed(() => {
  const user = authService.getUser();
  const fullName = user?.fullName || user?.username || 'Гость';
  const parts = fullName.split(' ');
  return parts[1] || parts[0];
});

const greeting = computed(() => {
  void i18n.locale;
  return i18n.t('ai.greeting').replace('{name}', userName.value);
});
const titleText = computed(() => { void i18n.locale; return i18n.t('ai.title'); });
const placeholderText = computed(() => { void i18n.locale; return i18n.t('ai.placeholder'); });
const errorText = computed(() => { void i18n.locale; return i18n.t('ai.error'); });
const errorApiText = computed(() => { void i18n.locale; return i18n.t('ai.errorApi'); });

const messages = ref([]);
const inputMessage = ref('');
const loading = ref(false);
const chatContainer = ref(null);
const conversationHistory = ref([]);

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
      conversationHistory.value.slice(-10)
    );
    
    if (response.success) {
      messages.value.push({ text: response.message, isUser: false });
      conversationHistory.value.push({ role: 'assistant', content: response.message });
    } else {
      messages.value.push({ 
        text: `${errorApiText.value}: ${response.error}`, 
        isUser: false,
        isError: true
      });
    }
  } catch (error) {
    messages.value.push({ 
      text: errorText.value, 
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

const formatMessage = (text) => {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
    .replace(/^(.+)$/, '<p>$1</p>')
    .replace(/\d+\. /g, '<br>$&')
    .replace(/^<p>/, '')
    .replace(/<\/p>$/, '');
};
</script>

<template>
  <div class="ai-page">
    <div class="ai-content">
      <div class="ai-header">
        <h2 class="ai-greeting">{{ greeting }}</h2>
        <h1 class="ai-title">{{ titleText }}</h1>
      </div>

      <div class="ai-chat" ref="chatContainer">
        <div v-for="(msg, index) in messages" :key="index"
             :class="['ai-message', msg.isUser ? 'user-msg' : 'bot-msg']">
          <div class="msg-text" v-html="formatMessage(msg.text)"></div>
        </div>
        <div v-if="loading" class="ai-message bot-msg">
          <div class="typing">
            <span></span><span></span><span></span>
          </div>
        </div>
      </div>

      <div class="ai-input-wrap">
        <input
          v-model="inputMessage"
          @keyup.enter="sendMessage"
          class="ai-input"
          :placeholder="placeholderText"
          :disabled="loading"
        />
        <button @click="sendMessage" class="ai-send" :disabled="loading || !inputMessage.trim()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ai-page {
  width: 100%;
  min-height: 91.3vh;
  background: var(--bg-page);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  transition: background 0.3s;
}

.ai-content {
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

.ai-header { text-align: center; }

.ai-greeting {
  font-size: 24px;
  font-weight: 400;
  margin: 0 0 10px;
  color: var(--text-secondary);
}

.ai-title {
  font-size: 48px;
  font-weight: 700;
  margin: 0;
  color: var(--text-primary);
}

.ai-chat {
  width: 100%;
  max-height: 400px;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.ai-message {
  display: flex;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

.user-msg { justify-content: flex-end; }
.bot-msg  { justify-content: flex-start; }

.msg-text {
  padding: 12px 20px;
  border-radius: 20px;
  max-width: 70%;
  word-wrap: break-word;
  font-size: 16px;
  line-height: 1.6;
}

.msg-text p { margin: 0 0 10px; }
.msg-text p:last-child { margin-bottom: 0; }
.msg-text strong { font-weight: 600; }

.user-msg .msg-text {
  background: #d90135;
  color: white;
}

.bot-msg .msg-text {
  background: var(--bg-card);
  color: var(--text-primary);
  box-shadow: var(--shadow);
  border: 1px solid var(--border-color);
}

.typing {
  display: flex;
  gap: 5px;
  padding: 12px 20px;
  background: var(--bg-card);
  border-radius: 20px;
  box-shadow: var(--shadow);
  border: 1px solid var(--border-color);
}

.typing span {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: var(--text-hint);
  animation: bounce 1.4s infinite;
}
.typing span:nth-child(2) { animation-delay: 0.2s; }
.typing span:nth-child(3) { animation-delay: 0.4s; }

@keyframes bounce {
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-10px); }
}

.ai-input-wrap {
  width: 100%;
  max-width: 700px;
  display: flex;
  gap: 10px;
  align-items: center;
}

.ai-input {
  flex: 1;
  padding: 16px 24px;
  border: 1px solid var(--border-color);
  border-radius: 50px;
  font-size: 16px;
  outline: none;
  background: var(--bg-card);
  color: var(--text-primary);
  box-shadow: var(--shadow);
  font-family: inherit;
  transition: background 0.3s, border-color 0.2s;
}

.ai-input::placeholder { color: var(--text-hint); font-style: italic; }
.ai-input:focus { border-color: var(--primary); box-shadow: var(--shadow-md); font-style: normal; }
.ai-input:disabled { opacity: 0.6; cursor: not-allowed; }

.ai-send {
  width: 50px; height: 50px;
  border-radius: 50%;
  border: none;
  background: var(--text-hint);
  color: white;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.ai-send:hover:not(:disabled) { background: var(--primary); transform: scale(1.05); }
.ai-send:disabled { opacity: 0.5; cursor: not-allowed; }

@media (max-width: 768px) {
  .ai-greeting { font-size: 20px; }
  .ai-title { font-size: 32px; }
  .msg-text { max-width: 85%; font-size: 14px; }
  .ai-chat { max-height: 300px; }
  .ai-content { gap: 24px; }
  .ai-input-wrap { max-width: 100%; }
}
@media (max-width: 480px) {
  .ai-page { padding: 12px; }
  .ai-greeting { font-size: 18px; }
  .ai-title { font-size: 26px; }
  .ai-input { padding: 12px 16px; font-size: 14px; }
  .ai-send { width: 44px; height: 44px; }
  .msg-text { max-width: 90%; padding: 10px 14px; font-size: 13px; }
}
</style>

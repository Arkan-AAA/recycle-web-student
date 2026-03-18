import apiService from './api.service';

class AIService {
    async sendMessage(userMessage, conversationHistory = []) {
        const messages = [
            ...conversationHistory,
            { role: 'user', content: userMessage }
        ];

        const response = await apiService.post('/ai/chat', { messages });
        return response;
    }
}

export default new AIService();

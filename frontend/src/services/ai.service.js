import apiService from './api.service';
import knowledgeBase from './knowledge.service';

class AIService {
    async sendMessage(userMessage, conversationHistory = [], instagramContext = '') {
        let systemContent = 'Ты AI ассистент для студентов колледжа Narxoz. Помогай с учебными вопросами, расписанием и других вопросах студенческой жизни. Отвечай на языке собеседника, будь дружелюбным и полезным.\n\nПРАВИЛА ФОРМАТИРОВАНИЯ:\n- Используй простой текст без markdown\n- Разделяй абзацы двойным переносом строки\n- Для списков используй цифры с точкой (1. 2. 3.)\n- Пиши структурированно и читабельно\n- НЕ используй символы ** для выделения\n- Делай короткие абзацы для удобства чтения';

        const collegeKnowledge = await knowledgeBase.getKnowledge();
        if (collegeKnowledge && collegeKnowledge.length > 0) {
            systemContent += `\n\n=== БАЗА ЗНАНИЙ О КОЛЛЕДЖЕ ===\n${collegeKnowledge}`;
            console.log('📤 База знаний добавлена в контекст:', collegeKnowledge.length, 'символов');
        } else {
            console.warn('⚠️ База знаний пуста!');
        }

        const messages = [
            { role: 'system', content: systemContent },
            ...conversationHistory,
            { role: 'user', content: userMessage }
        ];

        const response = await apiService.post('/ai/chat', { messages });
        return response;
    }
}

export default new AIService();

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

class AIService {
    async sendMessage(userMessage, conversationHistory = [], instagramContext = '') {
        if (!GROQ_API_KEY) {
            throw new Error('Groq API ключ не настроен');
        }

        let systemContent = 'Ты AI ассистент для студентов колледжа Narxoz. Помогай с учебными вопросами, расписанием и других вопросах студенческой жизни. Отвечай на языке собеседника, будь дружелюбным и полезным.';
        
        if (instagramContext && instagramContext.trim()) {
            systemContent += `\n\nВАЖНО! Используй эту актуальную информацию о колледже в своих ответах:\n${instagramContext}`;
            console.log('📤 Контекст отправлен в AI:', instagramContext.substring(0, 500) + '...');
        }

        const messages = [
            {
                role: 'system',
                content: systemContent
            },
            ...conversationHistory,
            {
                role: 'user',
                content: userMessage
            }
        ];

        try {
            const response = await fetch(GROQ_API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${GROQ_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'llama-3.3-70b-versatile',
                    messages: messages,
                    temperature: 0.7,
                    max_tokens: 1024,
                    top_p: 1,
                    stream: false
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error?.message || 'Ошибка API');
            }

            const data = await response.json();
            return {
                success: true,
                message: data.choices[0]?.message?.content || 'Нет ответа',
                usage: data.usage
            };
        } catch (error) {
            console.error('Groq API Error:', error);
            return {
                success: false,
                error: error.message || 'Не удалось получить ответ от AI'
            };
        }
    }
}

export default new AIService();

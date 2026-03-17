const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { csrfProtection } = require('../middleware/validation');

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

router.post('/chat', authenticate, csrfProtection, async (req, res) => {
    const { messages } = req.body;

    if (!process.env.GROQ_API_KEY) {
        return res.status(500).json({ success: false, error: 'Groq API ключ не настроен' });
    }

    if (!Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ success: false, error: 'Сообщения не переданы' });
    }

    try {
        const response = await fetch(GROQ_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages,
                temperature: 0.7,
                max_tokens: 250,
                top_p: 1,
                stream: false
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || 'Ошибка Groq API');
        }

        const data = await response.json();
        res.json({
            success: true,
            message: data.choices[0]?.message?.content || 'Нет ответа',
            usage: data.usage
        });
    } catch (error) {
        console.error('Groq API Error:', error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;

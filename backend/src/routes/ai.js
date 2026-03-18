const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { authenticate } = require('../middleware/auth');

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// Загружаем базу знаний один раз при старте сервера
let knowledgeCache = null;

const loadKnowledge = () => {
    if (knowledgeCache) return knowledgeCache;

    // Возможные пути к базе знаний
    const possibleDirs = [
        path.join(__dirname, '../../knowledge-base'),                     // в папке бэкенда (надёжно)
        path.join(__dirname, '../../../frontend/public/knowledge-base'),  // локально
        path.join(__dirname, '../../public/knowledge-base'),              // Railway
        path.join(__dirname, '../public/knowledge-base'),
    ];

    const files = [
        '01-about.md', '02-specialties.md', '03-admission.md',
        '04-schedule.md', '05-pricing.md', '06-academic.md',
        '07-infrastructure.md', '08-documents.md', '09-international.md',
        '10-faq-short.md'
    ];

    // Найти рабочую директорию
    let kbDir = null;
    for (const dir of possibleDirs) {
        if (fs.existsSync(path.join(dir, '01-about.md'))) {
            kbDir = dir;
            break;
        }
    }

    if (!kbDir) {
        console.warn('⚠️ База знаний не найдена ни в одном из путей:', possibleDirs);
        knowledgeCache = '';
        return knowledgeCache;
    }

    const parts = [];
    for (const file of files) {
        try {
            const content = fs.readFileSync(path.join(kbDir, file), 'utf-8');
            if (content.trim()) parts.push(content.trim());
        } catch (e) {
            console.warn(`⚠️ Не удалось загрузить ${file}:`, e.message);
        }
    }

    knowledgeCache = parts.join('\n\n---\n\n');
    console.log(`📚 База знаний загружена из ${kbDir}: ${knowledgeCache.length} символов`);
    return knowledgeCache;
};

const buildSystemPrompt = () => {
    const knowledge = loadKnowledge();

    let prompt = `Ты — умный помощник студентов колледжа Narxoz (Нархоз). Твоя задача — отвечать на вопросы о колледже, учёбе, расписании, оценках, поступлении и студенческой жизни.

ПРАВИЛА:
- Отвечай ТОЛЬКО на языке собеседника (русский, казахский или английский)
- Используй информацию из базы знаний ниже как основной источник
- Если информация есть в базе знаний — отвечай точно по ней, не придумывай
- Если информации нет в базе знаний — честно скажи что не знаешь и предложи обратиться в колледж
- Пиши кратко и по делу, без лишней воды
- Используй простой текст без markdown символов (* ** # и т.д.)
- Для списков используй цифры: 1. 2. 3.
- Разделяй абзацы пустой строкой`;

    if (knowledge) {
        prompt += `\n\n=== БАЗА ЗНАНИЙ КОЛЛЕДЖА NARXOZ ===\n\n${knowledge}\n\n=== КОНЕЦ БАЗЫ ЗНАНИЙ ===`;
    }

    return prompt;
};

// Вспомогательный эндпоинт для диагностики базы знаний в продакшене
// Можно вызвать GET /api/ai/debug/knowledge чтобы увидеть длину и часть текста
router.get('/debug/knowledge', (req, res) => {
    const knowledge = loadKnowledge();
    return res.json({
        length: knowledge.length,
        preview: knowledge.slice(0, 400)
    });
});

router.post('/chat', authenticate, async (req, res) => {
    const { messages } = req.body;

    if (!process.env.GROQ_API_KEY) {
        return res.status(500).json({ success: false, error: 'Groq API ключ не настроен' });
    }

    if (!Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ success: false, error: 'Сообщения не переданы' });
    }

    // Фильтруем только user/assistant сообщения, добавляем свой system
    const filtered = messages.filter(m => m.role === 'user' || m.role === 'assistant');
    const fullMessages = [
        { role: 'system', content: buildSystemPrompt() },
        ...filtered.slice(-10) // последние 10 сообщений для контекста
    ];

    try {
        const response = await fetch(GROQ_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: fullMessages,
                temperature: 0.4,
                max_tokens: 1024,
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

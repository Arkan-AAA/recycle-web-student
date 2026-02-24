# Обучение ИИ на локальной базе данных .md

## Можно ли это сделать?

**Да, это возможно!** Существует несколько подходов:

## 1. RAG (Retrieval-Augmented Generation)

Самый популярный подход для работы с локальными данными:

### Как работает:
1. Документы .md разбиваются на фрагменты
2. Создаются векторные представления (embeddings)
3. Сохраняются в векторную БД (ChromaDB, Pinecone, Weaviate)
4. При запросе ищутся релевантные фрагменты
5. Контекст передается в LLM для генерации ответа

### Технологии:
```javascript
// LangChain + OpenAI
import { OpenAI } from 'langchain/llms/openai';
import { RetrievalQAChain } from 'langchain/chains';
import { HNSWLib } from 'langchain/vectorstores/hnswlib';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
```

## 2. Fine-tuning локальных моделей

Полноценное обучение модели на ваших данных:

### Модели для локального использования:
- **LLaMA 2** (Meta)
- **Mistral 7B**
- **Phi-2** (Microsoft)
- **GPT4All**

### Инструменты:
- **Ollama** - запуск локальных LLM
- **LM Studio** - GUI для локальных моделей
- **LocalAI** - OpenAI-совместимый API

## 3. Рекомендуемое решение для вашего проекта

### Архитектура:

```
Markdown файлы (.md)
    ↓
Обработка и индексация
    ↓
Векторная БД (ChromaDB)
    ↓
RAG система
    ↓
LLM (OpenAI API или локальная модель)
    ↓
Ответ пользователю
```

### Пример структуры:

```
/knowledge-base/
  ├── college-info.md       # Информация о колледже
  ├── schedule-rules.md     # Правила расписания
  ├── grading-system.md     # Система оценок
  ├── subjects/
  │   ├── programming.md
  │   └── math.md
  └── faq.md               # Часто задаваемые вопросы
```

### Простая реализация:

```javascript
// backend/src/services/ai-knowledge.service.js
import fs from 'fs';
import path from 'path';
import { OpenAI } from 'openai';

class AIKnowledgeService {
    constructor() {
        this.knowledgeBase = this.loadMarkdownFiles();
    }

    loadMarkdownFiles() {
        const mdDir = path.join(__dirname, '../../knowledge-base');
        const files = fs.readdirSync(mdDir);
        
        return files
            .filter(f => f.endsWith('.md'))
            .map(f => ({
                name: f,
                content: fs.readFileSync(path.join(mdDir, f), 'utf-8')
            }));
    }

    async query(userQuestion) {
        // Поиск релевантного контекста
        const context = this.findRelevantContext(userQuestion);
        
        // Отправка в LLM с контекстом
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    role: "system",
                    content: `Ты помощник колледжа. Используй следующую информацию: ${context}`
                },
                {
                    role: "user",
                    content: userQuestion
                }
            ]
        });
        
        return response.choices[0].message.content;
    }

    findRelevantContext(question) {
        // Простой поиск по ключевым словам
        // В продакшене использовать векторный поиск
        return this.knowledgeBase
            .filter(doc => this.isRelevant(doc.content, question))
            .map(doc => doc.content)
            .join('\n\n');
    }
}
```

## 4. Преимущества подхода с .md файлами

✅ Легко редактировать и обновлять
✅ Версионирование через Git
✅ Человекочитаемый формат
✅ Не требует специальных инструментов
✅ Можно использовать Markdown разметку

## 5. Недостатки

❌ Не настоящее "обучение" модели
❌ Ограничен размером контекста LLM
❌ Требует хорошей организации данных
❌ Нужна векторная БД для больших объемов

## Вывод

**Для вашего проекта рекомендую RAG подход:**
- Создайте папку `/knowledge-base` с .md файлами
- Используйте LangChain для обработки
- Интегрируйте с существующим AI чатом
- Модель будет "знать" содержимое ваших файлов

Это не полноценное обучение, но даст нужный результат - ИИ будет отвечать на основе ваших данных.

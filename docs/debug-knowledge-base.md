# Отладка базы знаний

## Проверка загрузки

1. Откройте браузер (F12 → Console)
2. Перейдите на страницу AI чата
3. Проверьте логи:

```
✅ AI готов к работе
✅ База знаний загружена: XXXX символов
📚 Первые 500 символов: [содержимое]
```

4. Задайте вопрос: "Какой адрес колледжа?"
5. Проверьте лог:

```
📤 База знаний добавлена в контекст: XXXX символов
```

## Если база знаний пустая (0 символов)

### Проблема: Vite не видит файлы

**Решение 1:** Переместите knowledge-base в public

```bash
move knowledge-base frontend\public\knowledge-base
```

Обновите путь в `knowledge.service.js`:
```javascript
const modules = import.meta.glob('/knowledge-base/*.md', { as: 'raw', eager: true });
```

**Решение 2:** Используйте fetch вместо import.meta.glob

Замените `knowledge.service.js` на:

```javascript
class KnowledgeBaseService {
    constructor() {
        this.knowledge = '';
        this.isLoaded = false;
    }

    async loadKnowledge() {
        if (this.isLoaded) return;
        
        try {
            const files = [
                '01-about.md',
                '02-specialties.md',
                '03-admission.md',
                '04-schedule.md',
                '05-pricing.md',
                '06-academic.md',
                '07-infrastructure.md',
                '08-documents.md',
                '09-international.md',
                '10-faq-short.md'
            ];
            
            const contents = await Promise.all(
                files.map(file => 
                    fetch(`/knowledge-base/${file}`)
                        .then(r => r.text())
                        .catch(e => {
                            console.error(`Ошибка загрузки ${file}:`, e);
                            return '';
                        })
                )
            );
            
            this.knowledge = contents.filter(c => c).join('\n\n---\n\n');
            this.isLoaded = true;
            console.log('✅ База знаний загружена:', this.knowledge.length, 'символов');
        } catch (error) {
            console.error('❌ Ошибка загрузки базы знаний:', error);
        }
    }

    async getKnowledge() {
        if (!this.isLoaded) {
            await this.loadKnowledge();
        }
        return this.knowledge;
    }
}

export default new KnowledgeBaseService();
```

## Тестовые вопросы

После исправления проверьте:

- "Какой адрес колледжа?" → должен ответить: 10-й микрорайон, д. 7А
- "Во сколько начинаются занятия?" → должен ответить: 08:00
- "Сколько стоит общежитие?" → должен ответить: 25 000 тг/месяц
- "Кто директор?" → должен ответить: Абайдуллаев Мақсат Серікболұлы

## Если всё равно не работает

Проверьте в консоли браузера размер контекста:
```javascript
// В консоли браузера
import knowledgeBase from './services/knowledge.service.js';
const kb = await knowledgeBase.getKnowledge();
console.log('Размер:', kb.length);
console.log('Содержимое:', kb.substring(0, 1000));
```

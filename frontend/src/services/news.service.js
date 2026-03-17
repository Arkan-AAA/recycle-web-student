const NEWS_URL = 'https://collegenarxoz.kz/news/';

class NewsService {
    constructor() {
        this.cache = null;
        this.cacheTime = null;
        this.CACHE_DURATION = 60 * 60 * 1000; // 1 час
    }

    async getNews() {
        if (this.cache && this.cacheTime && (Date.now() - this.cacheTime < this.CACHE_DURATION)) {
            return { success: true, news: this.cache };
        }

        try {
            const response = await fetch(NEWS_URL);
            if (!response.ok) {
                throw new Error('Ошибка загрузки новостей');
            }

            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            const newsItems = [];
            const articles = doc.querySelectorAll('.news-item, article, .post, .news-card');

            articles.forEach((article, index) => {
                if (index >= 10) return;

                const title = article.querySelector('h2, h3, .title, .news-title')?.textContent?.trim();
                const description = article.querySelector('p, .description, .excerpt')?.textContent?.trim();
                const date = article.querySelector('.date, time, .published')?.textContent?.trim();

                if (title) {
                    newsItems.push({
                        title,
                        description: description?.substring(0, 200) || '',
                        date: date || ''
                    });
                }
            });

            this.cache = newsItems;
            this.cacheTime = Date.now();

            return { success: true, news: newsItems };
        } catch (error) {
            console.error('News Service Error:', error);
            return { success: false, error: error.message };
        }
    }

    getNewsContext() {
        if (!this.cache || this.cache.length === 0) return '';
        
        return this.cache.map((item, index) => 
            `Новость ${index + 1}: ${item.title}\n${item.description}\nДата: ${item.date}`
        ).join('\n\n');
    }
}

export default new NewsService();

const APIFY_API_TOKEN = import.meta.env.VITE_APIFY_API_TOKEN;
const DATASET_ID = 'eexlfnjb1iiUYuyHE'; // ID вашего dataset

class InstagramService {
    constructor() {
        this.cache = null;
        this.cacheTime = null;
        this.CACHE_DURATION = 60 * 60 * 1000; // 1 час
    }

    async getPosts() {
        if (this.cache && this.cacheTime && (Date.now() - this.cacheTime < this.CACHE_DURATION)) {
            return { success: true, posts: this.cache };
        }

        if (!APIFY_API_TOKEN) {
            return { success: false, error: 'Apify API токен не настроен' };
        }

        try {
            const response = await fetch(`https://api.apify.com/v2/datasets/${DATASET_ID}/items?token=${APIFY_API_TOKEN}`);
            
            if (!response.ok) {
                throw new Error('Ошибка получения данных');
            }

            const posts = await response.json();
            
            const formattedPosts = posts.slice(0, 10).map(post => ({
                caption: post.caption || post.text || '',
                timestamp: post.timestamp || post.takenAt,
                likes: post.likesCount || post.likes || 0,
                url: post.url || post.displayUrl
            }));

            this.cache = formattedPosts;
            this.cacheTime = Date.now();

            return { success: true, posts: formattedPosts };
        } catch (error) {
            console.error('Instagram Service Error:', error);
            return { success: false, error: error.message };
        }
    }

    getPostsContext() {
        if (!this.cache || this.cache.length === 0) return '';
        
        return this.cache.map((post, index) => 
            `Пост ${index + 1}: ${post.caption.substring(0, 200)}...`
        ).join('\n\n');
    }
}

export default new InstagramService();

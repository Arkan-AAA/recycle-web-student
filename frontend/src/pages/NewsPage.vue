<template>
  <div class="news-page">
    <div class="container">
      <div class="page-hero">
        <h1>{{ $t('news.title') }}</h1>
      </div>

      <div v-if="loading" class="state-msg">
        <i class="fas fa-spinner fa-spin"></i> {{ $t('common.loading') }}
      </div>

      <div v-else-if="!posts.length" class="state-empty">
        <i class="fab fa-instagram"></i>
        <p>{{ $t('news.noNews') }}</p>
      </div>

      <div v-else class="posts-grid">
        <a
          v-for="post in posts"
          :key="post.id"
          :href="post.instagram_url"
          target="_blank"
          rel="noopener noreferrer"
          class="post-card"
        >
          <div class="post-img-wrap">
            <img
              v-if="post.cover_url"
              :src="proxyImage(post.cover_url)"
              :alt="'Instagram post'"
              @error="onImgError($event, post)"
            />
            <div v-else class="post-no-img">
              <i class="fab fa-instagram"></i>
            </div>
            <div class="post-overlay">
              <i class="fab fa-instagram"></i>
            </div>
          </div>
          <div class="post-meta">
            <span class="post-date">{{ formatDate(post.created_at) }}</span>
            <i class="fas fa-external-link-alt"></i>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import apiService from '../services/api.service';

const API_URL = import.meta.env.VITE_API_URL || '/api';

export default {
  name: 'NewsPage',
  data() {
    return { posts: [], loading: true };
  },
  async mounted() {
    await this.loadPosts();
  },
  methods: {
    async loadPosts() {
      this.loading = true;
      try {
        const res = await apiService.get('/news');
        this.posts = res.success ? res.data : [];
      } catch {
        this.posts = [];
      } finally {
        this.loading = false;
      }
    },
    proxyImage(url) {
      if (!url) return '';
      if (url.includes('instagram.com/p/') && url.includes('/media/')) {
        return `${API_URL}/proxy-image?url=${encodeURIComponent(url)}`;
      }
      return url;
    },
    onImgError(e, post) {
      e.target.style.display = 'none';
      post.cover_url = null;
    },
    formatDate(d) {
      if (!d) return '';
      return new Date(d).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
    }
  }
}
</script>

<style scoped>
.news-page { padding: 2rem 0 4rem; }

.page-hero {
  text-align: center;
  padding: 1rem 0 2.5rem;
}
.page-hero h1 {
  font-size: 2.4rem;
  font-weight: 800;
  color: var(--text-primary);
}

.state-msg {
  text-align: center;
  padding: 4rem;
  color: var(--text-hint);
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.state-empty {
  text-align: center;
  padding: 5rem 2rem;
  color: var(--text-hint);
}
.state-empty i { font-size: 3rem; margin-bottom: 1rem; display: block; }
.state-empty p { font-size: 1rem; }

.posts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.post-card {
  display: block;
  text-decoration: none;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
}
.post-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary);
}

.post-img-wrap {
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  background: var(--bg-input);
}

.post-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s;
}
.post-card:hover .post-img-wrap img { transform: scale(1.04); }

.post-no-img {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: var(--text-hint);
}

.post-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}
.post-overlay i {
  font-size: 2.5rem;
  color: white;
  opacity: 0;
  transition: opacity 0.2s;
}
.post-card:hover .post-overlay { background: rgba(0,0,0,0.35); }
.post-card:hover .post-overlay i { opacity: 1; }

.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
}
.post-date { font-size: 0.8rem; color: var(--text-hint); }
.post-meta .fa-external-link-alt { font-size: 0.75rem; color: var(--text-hint); }

@media (max-width: 900px) { .posts-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 560px) {
  .posts-grid { grid-template-columns: 1fr; }
  .page-hero h1 { font-size: 1.8rem; }
}
</style>

<template>
  <div class="news">
    <h1 class="page-title">Новости</h1>
    <div class="posts-grid">
      <a
        v-for="(post, index) in posts"
        :key="index"
        :href="post.url"
        target="_blank"
        rel="noopener noreferrer"
        class="post-card"
      >
        <div class="post-image-wrap">
          <img :src="post.image" :alt="post.caption || 'Instagram пост'" class="post-image" loading="lazy" />
          <div class="post-overlay">
            <span class="post-overlay-icon">📷</span>
            <span class="post-overlay-text">Открыть в Instagram</span>
          </div>
        </div>
        <div class="post-footer">
          <div class="post-account">
            <span class="post-logo">📸</span>
            <span class="post-username">@narxozcollege</span>
          </div>
          <p v-if="post.caption" class="post-caption">{{ post.caption }}</p>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import postsData from '../newsData/instagram-posts.json';

export default {
  name: 'NewsPage',
  setup() {
    const posts = ref(postsData);
    return { posts };
  }
};
</script>

<style scoped>
.news {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Rubik', sans-serif;
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  color: #1e1e1e;
  border-left: 4px solid #d50032;
  padding-left: 12px;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.posts-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
}

.post-card {
  width: 375px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  text-decoration: none;
  color: inherit;
  background: #fff;
  transition: transform 0.25s, box-shadow 0.25s;
  display: flex;
  flex-direction: column;
}

.post-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}

.post-image-wrap {
  position: relative;
  width: 375px;
  height: 375px;
  overflow: hidden;
  background: #f0f0f0;
}

.post-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s;
}

.post-card:hover .post-image {
  transform: scale(1.03);
}

.post-overlay {
  position: absolute;
  inset: 0;
  background: rgba(30, 30, 30, 0.55);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.25s;
}

.post-card:hover .post-overlay {
  opacity: 1;
}

.post-overlay-icon {
  font-size: 32px;
}

.post-overlay-text {
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.post-footer {
  padding: 12px 16px;
  border-top: 1px solid #f0f0f0;
}

.post-account {
  display: flex;
  align-items: center;
  gap: 8px;
}

.post-logo {
  font-size: 18px;
}

.post-username {
  font-size: 13px;
  font-weight: 600;
  color: #1e1e1e;
}

.post-caption {
  font-size: 12px;
  color: #666;
  margin: 6px 0 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 768px) {
  .post-card, .post-image-wrap { width: 100%; }
  .posts-grid { gap: 16px; }
}
</style>

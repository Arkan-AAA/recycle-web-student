<template>
  <div class="news">
    <div class="container">
      <div class="instagram-posts">
        <div v-for="(post, index) in posts" :key="index" class="instagramPost">
          <a :href="post.url" target="_blank" rel="noopener noreferrer">
            <img :src="proxyImage(post.image)" :alt="'Instagram post ' + (index + 1)">
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import postsData from '../newsData/instagram-posts.json';

const API_URL = import.meta.env.VITE_API_URL || '/api';

export default {
  name: 'NewsPage',
  setup() {
    const posts = ref([]);
    const proxyImage = (url) => `${API_URL}/proxy-image?url=${encodeURIComponent(url)}`;

    onMounted(() => {
      posts.value = postsData;
    });

    return { posts, proxyImage };
  }
}
</script>

<style scoped>
.news { padding: 1.5rem 0; }

.instagram-posts {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  justify-items: center;
}

.instagramPost { width: 100%; max-width: 375px; }

.instagramPost a {
  display: block;
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: transform 0.3s, box-shadow 0.3s;
}
.instagramPost a:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.instagramPost img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  display: block;
}

@media (max-width: 768px) {
  .instagram-posts { grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1rem; }
  .instagramPost img { height: 320px; }
}
@media (max-width: 480px) {
  .instagram-posts { grid-template-columns: 1fr; }
  .instagramPost { max-width: 100%; }
  .instagramPost img { height: 280px; }
}
</style>

<template>
  <div class="news">
    <div class="instagram-posts">
      <div v-for="(post, index) in posts" :key="index" class="instagramPost">
        <a :href="post.url" target="_blank" rel="noopener noreferrer">
          <img :src="proxyImage(post.image)" :alt="'Instagram post ' + (index + 1)">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import postsData from '../newsData/instagram-posts.json';

export default {
  name: 'NewsPage',
  setup() {
    const posts = ref([]);
    const proxyImage = (url) => `http://localhost:3001/api/proxy-image?url=${encodeURIComponent(url)}`;

    onMounted(() => {
      posts.value = postsData;
    });

    return { posts, proxyImage };
  }
}
</script>

<style scoped>
.news {
  padding: 20px;
  max-width: 90%;
  margin: 0 auto;
}

.instagram-posts {
  display: flex ;
  gap: 40px;
  justify-content: center;
  flex-wrap: wrap;
}

.instagramPost {
  flex: 0 1 auto;
}

.instagramPost a {
  display: block;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.instagramPost a:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.2);
}

.instagramPost img {
  width: 375px;
  height: 500px;
  object-fit: cover;
  display: block;
}
</style>
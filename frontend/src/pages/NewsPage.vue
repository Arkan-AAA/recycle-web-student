<template>
  <div class="news">
    <div class="instagram-posts">
      <div v-for="(post, index) in posts" :key="index" class="instagram-post" :ref="el => setRef(el, index)">
        <div v-if="!loaded[index]" class="skeleton">
          <div class="skeleton-header"></div>
          <div class="skeleton-image"></div>
          <div class="skeleton-footer"></div>
        </div>
        <blockquote
          v-show="loaded[index]"
          class="instagram-media"
          :data-instgrm-permalink="post.url"
          data-instgrm-version="14"
          style="background:#FFF;border:0;border-radius:12px;box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15);margin:1px;max-width:375px;min-width:326px;padding:0;width:375px;"
        ></blockquote>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import postsData from '../newsData/instagram-posts.json';

export default {
  name: 'NewsPage',
  setup() {
    const posts = ref(postsData);
    const loaded = ref({});
    const postRefs = ref([]);
    const observer = ref(null);

    const setRef = (el, index) => { if (el) postRefs.value[index] = el; };

    const loadScript = () => new Promise(resolve => {
      if (window.instgrm) return resolve();
      const s = document.createElement('script');
      s.async = true;
      s.src = '//www.instagram.com/embed.js';
      s.onload = resolve;
      document.body.appendChild(s);
    });

    const processPost = async (index) => {
      if (loaded.value[index]) return;
      loaded.value[index] = true;
      await loadScript();
      setTimeout(() => window.instgrm?.Embeds.process(), 100);
    };

    onMounted(() => {
      observer.value = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const i = postRefs.value.indexOf(entry.target);
            if (i !== -1) { processPost(i); observer.value.unobserve(entry.target); }
          }
        });
      }, { rootMargin: '100px' });

      setTimeout(() => postRefs.value.forEach(r => r && observer.value.observe(r)), 100);
    });

    onUnmounted(() => observer.value?.disconnect());

    return { posts, loaded, setRef };
  }
};
</script>

<style scoped>
.news {
  padding: 20px;
  max-width: 90%;
  margin: 0 auto;
}

.instagram-posts {
  display: flex;
  gap: 40px;
  justify-content: center;
  flex-wrap: wrap;
}

.instagram-post {
  width: 375px;
}

.skeleton {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15);
  overflow: hidden;
  width: 375px;
}

.skeleton-header {
  height: 60px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

.skeleton-image {
  height: 375px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

.skeleton-footer {
  height: 80px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>

<template>
  <div class="news">

    <div class="instagram-posts">
      <div v-for="(post, index) in posts" :key="index" class="instagram-post" :ref="el => setPostRef(el, index)">
        <div v-if="!loadedPosts[index]" class="skeleton">
          <div class="skeleton-header"></div>
          <div class="skeleton-image"></div>
          <div class="skeleton-footer"></div>
        </div>
        <blockquote
          v-show="loadedPosts[index]"
          class="instagram-media"
          data-instgrm-captioned
          :data-instgrm-permalink="post.url"
          data-instgrm-version="14"
          style="background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);">
        </blockquote>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';

export default {
  name: 'NewsPage',
  setup() {
    const posts = ref([
      { url: 'https://www.instagram.com/reel/DUaHSOqDMv7/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
      { url: 'https://www.instagram.com/p/DUZrkuyjBZ9/?utm_source=ig_embed&utm_campaign=loading' },
      { url: 'https://www.instagram.com/p/DUX6K_ZDFLj/?utm_source=ig_embed&utm_campaign=loading' }
    ]);
    const loadedPosts = ref({});
    const postRefs = ref([]);
    const observer = ref(null);

    const setPostRef = (el, index) => {
      if (el) postRefs.value[index] = el;
    };

    const loadInstagramScript = () => {
      return new Promise((resolve) => {
        if (window.instgrm) {
          resolve();
        } else {
          const script = document.createElement('script');
          script.async = true;
          script.src = '//www.instagram.com/embed.js';
          script.onload = resolve;
          document.body.appendChild(script);
        }
      });
    };

    const processPost = async (index) => {
      if (loadedPosts.value[index]) return;
      
      loadedPosts.value[index] = true;
      await loadInstagramScript();
      
      setTimeout(() => {
        if (window.instgrm) {
          window.instgrm.Embeds.process();
        }
      }, 100);
    };

    onMounted(() => {
      observer.value = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const index = postRefs.value.indexOf(entry.target);
              if (index !== -1) {
                processPost(index);
                observer.value.unobserve(entry.target);
              }
            }
          });
        },
        { rootMargin: '100px' }
      );

      setTimeout(() => {
        postRefs.value.forEach((ref) => {
          if (ref) observer.value.observe(ref);
        });
      }, 100);
    });

    onUnmounted(() => {
      if (observer.value) {
        observer.value.disconnect();
      }
    });

    return {
      posts,
      loadedPosts,
      setPostRef
    };
  }
}
</script>

<style scoped>
.news {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.instagram-posts {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.instagram-post {
  flex: 0 1 auto;
}

.news :deep(.instagram-media) {
  height: 800px !important;
  max-height: 800px !important;
  overflow: hidden !important;
}

.skeleton {
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15);
  overflow: hidden;
  max-width: 540px;
  min-width: 326px;
  height: 800px;
}

.skeleton-header {
  height: 60px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

.skeleton-image {
  height: 600px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

.skeleton-footer {
  height: 140px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>
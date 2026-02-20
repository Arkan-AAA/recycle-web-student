<template>
  <div :class="$style.parent">
    <div :class="$style.instagramPosts">
      <div v-for="(post, index) in posts" :key="index" :class="$style.instagramPost" :ref="el => setPostRef(el, index)">
        <div v-if="!loadedPosts[index]" :class="$style.skeleton">
          <div :class="$style.skeletonHeader"></div>
          <div :class="$style.skeletonImage"></div>
          <div :class="$style.skeletonFooter"></div>
        </div>
        <blockquote
          v-show="loadedPosts[index]"
          class="instagram-media"
          :data-instgrm-permalink="post.url"
          data-instgrm-version="14"
          style="background:#FFF; border:0; border-radius:20px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:392px; min-width:326px; padding:0; width:392px;">
        </blockquote>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';

export default {
  name: 'HomePage',
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
<style  module>.parent {
  width: 100%;
  min-height: 900px;
  background-color: #fff;
  padding: 20px 0;
  font-family: Inter;
}

.instagramPosts {
  display: flex;
  gap: 66px;
  justify-content: center;
  padding: 13px 50px;
}

.instagramPost {
  width: 392px;
  overflow: hidden;
}

@media (max-width: 1024px) {
  .instagramPosts {
    gap: 40px;
    padding: 13px 30px;
  }
  
  .instagramPost {
    width: 350px;
  }
}

@media (max-width: 768px) {
  .instagramPosts {
    gap: 30px;
    padding: 13px 20px;
    flex-wrap: wrap;
  }
  
  .instagramPost {
    width: 100%;
    max-width: 450px;
  }
}

@media (max-width: 480px) {
  .parent {
    padding: 10px 0;
  }
  
  .instagramPosts {
    gap: 20px;
    padding: 10px;
  }
}

.skeleton {
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15);
  overflow: hidden;
  width: 392px;
}

.skeletonHeader {
  height: 60px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

.skeletonImage {
  height: 400px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

.skeletonFooter {
  height: 80px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

@media (max-width: 1024px) {
  .skeleton {
    width: 350px;
  }
}

@media (max-width: 768px) {
  .skeleton {
    width: 100%;
    max-width: 450px;
  }
}

</style>
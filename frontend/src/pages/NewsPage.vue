<template>
  <div class="news">
    <h2>Новости колледжа</h2>
    
    <div class="instagram-posts">
      <div class="instagram-post">
        <blockquote
            class="instagram-media"
            data-instgrm-captioned
            data-instgrm-permalink="https://www.instagram.com/reel/DUaHSOqDMv7/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
            data-instgrm-version="14"
            style="background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);">
        </blockquote>
      </div>

      <div class="instagram-post">
        <blockquote 
          class="instagram-media"
          data-instgrm-captioned
          data-instgrm-permalink="https://www.instagram.com/p/DUZrkuyjBZ9/?utm_source=ig_embed&amp;utm_campaign=loading"
          data-instgrm-version="14" 
          style="background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);">
        </blockquote>
      </div>

      <div class="instagram-post">
        <blockquote
          class="instagram-media"
          data-instgrm-captioned
          data-instgrm-permalink="https://www.instagram.com/p/DUX6K_ZDFLj/?utm_source=ig_embed&amp;utm_campaign=loading"
          data-instgrm-version="14"
          style="background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);">
        </blockquote>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewsPage',
  mounted() {
    if (!window.instgrm) {
      const script = document.createElement('script');
      script.async = true;
      script.src = '//www.instagram.com/embed.js';
      document.body.appendChild(script);
    } else {
      window.instgrm.Embeds.process();
    }
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
</style>
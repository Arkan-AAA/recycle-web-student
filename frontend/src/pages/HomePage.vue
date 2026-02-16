<template>
  <div :class="$style.parent">
    <div :class="$style.instagramPosts">
      <div :class="$style.instagramPost">
        <blockquote
          class="instagram-media"
          data-instgrm-permalink="https://www.instagram.com/reel/DUaHSOqDMv7/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
          data-instgrm-version="14"
          style="background:#FFF; border:0; border-radius:20px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:392px; min-width:326px; padding:0; width:392px;">
        </blockquote>
      </div>

      <div :class="$style.instagramPost">
        <blockquote
          class="instagram-media"
          data-instgrm-permalink="https://www.instagram.com/p/DUZrkuyjBZ9/?utm_source=ig_embed&amp;utm_campaign=loading"
          data-instgrm-version="14"
          style="background:#FFF; border:0; border-radius:20px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:392px; min-width:326px; padding:0; width:392px;">
        </blockquote>
      </div>

      <div :class="$style.instagramPost">
        <blockquote
          class="instagram-media"
          data-instgrm-permalink="https://www.instagram.com/p/DUX6K_ZDFLj/?utm_source=ig_embed&amp;utm_campaign=loading"
          data-instgrm-version="14"
          style="background:#FFF; border:0; border-radius:20px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:392px; min-width:326px; padding:0; width:392px;">
        </blockquote>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
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

</style>
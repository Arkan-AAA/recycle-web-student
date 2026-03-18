<template>
  <div class="home-page">
    <div class="container">
      <!-- Геро секция -->
      <section class="hero-section">
        <div class="row align-items-center">
          <div class="col-12 col-lg-6">
            <div class="hero-content">
              <h1 class="hero-title">
                {{ $t('nav.home') }}
                <span class="highlight">Narxoz College</span>
              </h1>
              <p class="hero-description">
                {{ $t('footer.rights') }}
              </p>
              <div class="hero-actions">
                <router-link to="/journal" class="btn btn-primary btn-lg">
                  {{ $t('nav.journal') }}
                </router-link>
                <router-link to="/news" class="btn btn-secondary btn-lg">
                  {{ $t('nav.news') }}
                </router-link>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-6">
            <div class="hero-image">
              <img src="../assets/images/image 1.png" alt="College" class="img-fluid" />
            </div>
          </div>
        </div>
      </section>

      <!-- Карточки сервисов -->
      <section class="services-section">
        <div class="row">
          <div class="col-12">
            <h2 class="section-title text-center">
              {{ $t('nav.education') }}
            </h2>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-6 col-lg-4" v-for="service in services" :key="service.id">
            <div class="service-card card">
              <div class="card-body text-center">
                <div class="service-icon">
                  <i :class="service.icon"></i>
                </div>
                <h3 class="service-title">{{ $t(service.title) }}</h3>
                <p class="service-description">{{ $t(service.description) }}</p>
                <router-link :to="service.link" class="btn btn-primary">
                  {{ $t('common.more') }}
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Instagram посты -->
      <section class="instagram-section">
        <div class="row">
          <div class="col-12">
            <h2 class="section-title text-center">
              {{ $t('news.title') }}
            </h2>
          </div>
        </div>
        <div class="instagram-posts">
          <div 
            v-for="(post, index) in posts" 
            :key="index" 
            class="instagram-post" 
            :ref="el => setPostRef(el, index)"
          >
            <div v-if="!loadedPosts[index]" class="skeleton">
              <div class="skeleton-header"></div>
              <div class="skeleton-image"></div>
              <div class="skeleton-footer"></div>
            </div>
            <blockquote
              v-show="loadedPosts[index]"
              class="instagram-media"
              :data-instgrm-permalink="post.url"
              data-instgrm-version="14"
              style="background:#FFF; border:0; border-radius:20px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:392px; min-width:326px; padding:0; width:100%;"
            >
            </blockquote>
          </div>
        </div>
      </section>
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
    
    const services = ref([
      {
        id: 1,
        title: 'nav.journal',
        description: 'journal.title',
        icon: 'fas fa-book',
        link: '/journal'
      },
      {
        id: 2,
        title: 'nav.schedule',
        description: 'schedule.title',
        icon: 'fas fa-calendar',
        link: '/schedule'
      },
      {
        id: 3,
        title: 'nav.grades',
        description: 'grades.title',
        icon: 'fas fa-chart-line',
        link: '/grades'
      },
      {
        id: 4,
        title: 'nav.profile',
        description: 'profile.title',
        icon: 'fas fa-user',
        link: '/profile'
      },
      {
        id: 5,
        title: 'nav.aiChat',
        description: 'nav.aiChat',
        icon: 'fas fa-robot',
        link: '/aichat'
      },
      {
        id: 6,
        title: 'nav.news',
        description: 'news.title',
        icon: 'fas fa-newspaper',
        link: '/news'
      }
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
      services,
      loadedPosts,
      setPostRef
    };
  }
}
</script>

<style scoped>
.home-page {
  padding-top: var(--header-height);
  min-height: 100vh;
}

/* Геро секция */
.hero-section {
  padding: var(--spacing-xxl) 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.hero-content {
  padding: var(--spacing-lg);
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  color: var(--dark-color);
  margin-bottom: var(--spacing-lg);
  line-height: 1.2;
}

.highlight {
  color: #d50032;
  display: block;
}

.hero-description {
  font-size: var(--font-size-lg);
  color: var(--secondary-color);
  margin-bottom: var(--spacing-xl);
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: var(--spacing-lg);
  flex-wrap: wrap;
}

.hero-image {
  text-align: center;
  padding: var(--spacing-lg);
}

.hero-image img {
  max-width: 100%;
  height: auto;
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-lg);
}

/* Секция сервисов */
.services-section {
  padding: var(--spacing-xxl) 0;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 600;
  color: var(--dark-color);
  margin-bottom: var(--spacing-xxl);
}

.service-card {
  height: 100%;
  transition: all 0.3s ease;
  border: none;
  box-shadow: var(--shadow);
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.service-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #d50032, #b8002a);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--spacing-lg);
  font-size: 2rem;
  color: white;
}

.service-title {
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--dark-color);
  margin-bottom: var(--spacing-md);
}

.service-description {
  color: var(--secondary-color);
  margin-bottom: var(--spacing-lg);
  line-height: 1.6;
}

/* Instagram секция */
.instagram-section {
  padding: var(--spacing-xxl) 0;
  background: #f8f9fa;
}

.instagram-posts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--spacing-xl);
  justify-items: center;
  padding: var(--spacing-lg) 0;
}

.instagram-post {
  width: 100%;
  max-width: 392px;
  overflow: hidden;
}

/* Скелетон */
.skeleton {
  background: white;
  border-radius: 20px;
  box-shadow: var(--shadow);
  overflow: hidden;
  width: 100%;
  max-width: 392px;
}

.skeleton-header {
  height: 60px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

.skeleton-image {
  height: 400px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

.skeleton-footer {
  height: 80px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Планшеты */
@media (max-width: 991.98px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .hero-actions {
    justify-content: center;
  }
  
  .instagram-posts {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--spacing-lg);
  }
}

/* Мобильные устройства */
@media (max-width: 575.98px) {
  .hero-section {
    padding: var(--spacing-xl) 0;
  }
  
  .hero-title {
    font-size: 2rem;
    text-align: center;
  }
  
  .hero-description {
    text-align: center;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .hero-actions .btn {
    width: 100%;
    max-width: 300px;
  }
  
  .section-title {
    font-size: 1.75rem;
  }
  
  .service-icon {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
  }
  
  .instagram-posts {
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
    padding: var(--spacing-md) 0;
  }
  
  .services-section,
  .instagram-section {
    padding: var(--spacing-xl) 0;
  }
}

/* Очень маленькие экраны */
@media (max-width: 399.98px) {
  .hero-title {
    font-size: 1.75rem;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
  
  .hero-content,
  .hero-image {
    padding: var(--spacing-md);
  }
  
  .service-card .card-body {
    padding: var(--spacing-md);
  }
}
</style>
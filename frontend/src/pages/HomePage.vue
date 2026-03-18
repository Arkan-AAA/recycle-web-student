<template>
  <div class="home-page">

    <!-- Hero -->
    <section class="hero">
      <div class="container hero-inner">
        <div class="hero-text">
          <p class="hero-eyebrow">Narxoz College</p>
          <h1 class="hero-title">Студенческий<br><span>веб-журнал</span></h1>
          <p class="hero-sub">Оценки, расписание, новости и учебные материалы — всё в одном месте</p>
          <div class="hero-btns">
            <router-link to="/journal" class="btn btn-primary btn-lg">
              <i class="fas fa-book"></i> {{ $t('nav.journal') }}
            </router-link>
            <router-link to="/news" class="btn btn-outline btn-lg">
              <i class="fas fa-newspaper"></i> {{ $t('nav.news') }}
            </router-link>
          </div>
        </div>
        <div class="hero-visual">
          <div class="hero-card">
            <div class="hc-row">
              <i class="fas fa-graduation-cap"></i>
              <div>
                <div class="hc-label">Средний балл</div>
                <div class="hc-val">87.4</div>
              </div>
            </div>
            <div class="hc-divider"></div>
            <div class="hc-row">
              <i class="fas fa-calendar-check"></i>
              <div>
                <div class="hc-label">Посещаемость</div>
                <div class="hc-val">94%</div>
              </div>
            </div>
            <div class="hc-divider"></div>
            <div class="hc-row">
              <i class="fas fa-book-open"></i>
              <div>
                <div class="hc-label">Предметов</div>
                <div class="hc-val">8</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services -->
    <section class="services">
      <div class="container">
        <h2 class="section-title">{{ $t('nav.education') }}</h2>
        <div class="services-grid">
          <router-link
            v-for="s in services"
            :key="s.id"
            :to="s.link"
            class="service-card"
          >
            <div class="sc-icon">
              <i :class="s.icon"></i>
            </div>
            <div class="sc-body">
              <h3>{{ $t(s.title) }}</h3>
              <p>{{ s.desc }}</p>
            </div>
            <i class="fas fa-arrow-right sc-arrow"></i>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Instagram / News -->
    <section class="insta-section">
      <div class="container">
        <h2 class="section-title">{{ $t('news.title') }}</h2>
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
              style="background:#FFF;border:0;border-radius:16px;box-shadow:0 2px 12px rgba(0,0,0,0.08);margin:0;max-width:392px;min-width:280px;padding:0;width:100%;"
            ></blockquote>
          </div>
        </div>
      </div>
    </section>

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
      { id: 1, title: 'nav.journal',   desc: 'Электронный журнал посещаемости',  icon: 'fas fa-book',        link: '/journal' },
      { id: 2, title: 'nav.schedule',  desc: 'Расписание занятий на неделю',      icon: 'fas fa-calendar-alt', link: '/schedule' },
      { id: 3, title: 'nav.grades',    desc: '100-балльная система оценивания',   icon: 'fas fa-chart-bar',   link: '/grades' },
      { id: 4, title: 'nav.profile',   desc: 'Личный кабинет студента',           icon: 'fas fa-user-circle', link: '/profile' },
      { id: 5, title: 'nav.aiChat',    desc: 'Умный помощник на базе ИИ',         icon: 'fas fa-robot',       link: '/aichat' },
      { id: 6, title: 'nav.news',      desc: 'Новости и события колледжа',        icon: 'fas fa-newspaper',   link: '/news' },
    ]);

    const loadedPosts = ref({});
    const postRefs = ref([]);
    const observer = ref(null);

    const setPostRef = (el, index) => { if (el) postRefs.value[index] = el; };

    const loadInstagramScript = () => new Promise(resolve => {
      if (window.instgrm) return resolve();
      const s = document.createElement('script');
      s.async = true; s.src = '//www.instagram.com/embed.js'; s.onload = resolve;
      document.body.appendChild(s);
    });

    const processPost = async (index) => {
      if (loadedPosts.value[index]) return;
      loadedPosts.value[index] = true;
      await loadInstagramScript();
      setTimeout(() => { if (window.instgrm) window.instgrm.Embeds.process(); }, 100);
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

    return { posts, services, loadedPosts, setPostRef };
  }
}
</script>

<style scoped>
.home-page {
  padding-top: var(--header-height);
  min-height: 100vh;
  background: var(--gray-100);
}

/* ── Hero ── */
.hero {
  background: #1e1e1e;
  padding: 5rem 0 4rem;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: -80px; right: -80px;
  width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(213,0,50,0.15) 0%, transparent 70%);
  pointer-events: none;
}

.hero-inner {
  display: flex;
  align-items: center;
  gap: 3rem;
}

.hero-text { flex: 1; }

.hero-eyebrow {
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--primary);
  margin-bottom: 1rem;
}

.hero-title {
  font-size: 3.2rem;
  font-weight: 800;
  color: #fff;
  line-height: 1.1;
  margin-bottom: 1.25rem;
}

.hero-title span { color: var(--primary); }

.hero-sub {
  font-size: 1.05rem;
  color: #aaa;
  line-height: 1.7;
  margin-bottom: 2rem;
  max-width: 440px;
}

.hero-btns {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-outline {
  background: transparent;
  border: 2px solid rgba(255,255,255,0.25);
  color: #fff;
}
.btn-outline:hover {
  border-color: var(--primary);
  color: var(--primary);
  background: rgba(213,0,50,0.08);
}

/* Hero card */
.hero-visual { flex-shrink: 0; }

.hero-card {
  background: #2a2a2a;
  border: 1px solid #333;
  border-radius: 20px;
  padding: 2rem;
  min-width: 260px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.4);
}

.hc-row {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.hc-row i {
  font-size: 1.5rem;
  color: var(--primary);
  width: 40px;
  text-align: center;
}

.hc-label {
  font-size: 0.75rem;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.hc-val {
  font-size: 1.4rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
}

.hc-divider {
  height: 1px;
  background: #333;
  margin: 1.25rem 0;
}

/* ── Section title ── */
.section-title {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 2rem;
  position: relative;
  padding-left: 1rem;
}

.section-title::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 4px;
  background: var(--primary);
  border-radius: 2px;
}

/* ── Services ── */
.services {
  padding: 4rem 0;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.service-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: var(--white);
  border-radius: var(--radius);
  padding: 1.5rem;
  text-decoration: none;
  border: 1px solid var(--gray-200);
  transition: all 0.2s ease;
  box-shadow: var(--shadow-sm);
}

.service-card:hover {
  border-color: var(--primary);
  box-shadow: 0 4px 20px rgba(213,0,50,0.12);
  transform: translateY(-2px);
}

.sc-icon {
  width: 52px;
  height: 52px;
  background: var(--primary-light);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.sc-icon i {
  font-size: 1.3rem;
  color: var(--primary);
}

.sc-body { flex: 1; min-width: 0; }

.sc-body h3 {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 0.2rem;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.sc-body p {
  font-size: 0.8rem;
  color: var(--text-muted);
  line-height: 1.4;
}

.sc-arrow {
  color: var(--gray-400);
  font-size: 0.85rem;
  flex-shrink: 0;
  transition: color 0.2s, transform 0.2s;
}

.service-card:hover .sc-arrow {
  color: var(--primary);
  transform: translateX(3px);
}

/* ── Instagram ── */
.insta-section {
  padding: 0 0 4rem;
}

.instagram-posts {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  justify-items: center;
}

.instagram-post {
  width: 100%;
  max-width: 392px;
}

.skeleton {
  background: var(--white);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.skeleton-header,
.skeleton-image,
.skeleton-footer {
  background: linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

.skeleton-header { height: 60px; }
.skeleton-image  { height: 300px; }
.skeleton-footer { height: 70px; }

@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* ── Responsive ── */
@media (max-width: 1024px) {
  .services-grid { grid-template-columns: repeat(2, 1fr); }
  .instagram-posts { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .hero { padding: 3rem 0; }
  .hero-inner { flex-direction: column; gap: 2rem; }
  .hero-title { font-size: 2.2rem; }
  .hero-visual { width: 100%; }
  .hero-card { min-width: unset; }
  .services-grid { grid-template-columns: 1fr; }
  .instagram-posts { grid-template-columns: 1fr; }
  .section-title { font-size: 1.3rem; }
}

@media (max-width: 480px) {
  .hero-title { font-size: 1.8rem; }
  .hero-btns { flex-direction: column; }
  .hero-btns .btn { width: 100%; justify-content: center; }
}
</style>

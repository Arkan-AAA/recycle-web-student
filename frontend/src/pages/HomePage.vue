<template>
  <div class="home-page">

    <!-- Hero -->
    <section class="hero">
      <div class="container hero-inner">
        <div class="hero-text">
          <p class="hero-eyebrow">{{ $t('home.brand') }}</p>
          <h1 class="hero-title">{{ $t('home.heroTitle') }}<br><span>{{ $t('home.heroTitleSpan') }}</span></h1>
          <p class="hero-sub">{{ $t('home.heroSub') }}</p>
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
                <div class="hc-label">{{ $t('home.stat.avg') }}</div>
                <div class="hc-val">87.4</div>
              </div>
            </div>
            <div class="hc-divider"></div>
            <div class="hc-row">
              <i class="fas fa-calendar-check"></i>
              <div>
                <div class="hc-label">{{ $t('home.stat.attendance') }}</div>
                <div class="hc-val">94%</div>
              </div>
            </div>
            <div class="hc-divider"></div>
            <div class="hc-row">
              <i class="fas fa-book-open"></i>
              <div>
                <div class="hc-label">{{ $t('home.stat.subjects') }}</div>
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
              <p>{{ $t(s.desc) }}</p>
            </div>
            <i class="fas fa-arrow-right sc-arrow"></i>
          </router-link>
        </div>
      </div>
    </section>

    <!-- News -->
    <section class="news-preview">
      <div class="container">
        <h2 class="section-title">{{ $t('news.title') }}</h2>

        <div v-if="loadingNews" class="news-state-msg">
          <i class="fas fa-spinner fa-spin"></i> {{ $t('common.loading') }}
        </div>

        <div v-else-if="!newsPosts.length" class="news-state-empty">
          <i class="far fa-newspaper"></i>
          <p>{{ $t('news.noNews') }}</p>
        </div>

        <div v-else class="news-posts-grid">
          <a
            v-for="post in newsPosts"
            :key="post.id"
            :href="post.instagram_url"
            target="_blank"
            rel="noopener noreferrer"
            class="news-post-card"
          >
            <div class="news-post-img-wrap">
              <img
                v-if="post.cover_url"
                :src="post.cover_url"
                :alt="$t('news.instagramPostAlt')"
              />
              <div v-else class="news-post-no-img">
                <i class="fab fa-instagram"></i>
              </div>
            </div>
            <div class="news-post-meta">
              <span class="news-post-date">{{ formatDate(post.created_at) }}</span>
              <i class="fas fa-external-link-alt"></i>
            </div>
          </a>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import { computed, ref, onMounted } from 'vue';
import apiService from '../services/api.service';
import i18n from '../i18n';

export default {
  name: 'HomePage',
  setup() {
    const services = ref([
      { id: 1, title: 'nav.journal',   desc: 'home.desc.journal',  icon: 'fas fa-book',        link: '/journal' },
      { id: 2, title: 'nav.schedule',  desc: 'home.desc.schedule', icon: 'fas fa-calendar-alt', link: '/schedule' },
      { id: 3, title: 'nav.grades',    desc: 'home.desc.grades',   icon: 'fas fa-chart-bar',   link: '/grades' },
      { id: 4, title: 'nav.profile',   desc: 'home.desc.profile',  icon: 'fas fa-user-circle', link: '/profile' },
      { id: 5, title: 'nav.aiChat',    desc: 'home.desc.ai',       icon: 'fas fa-robot',       link: '/aichat' },
      { id: 6, title: 'nav.news',      desc: 'home.desc.news',     icon: 'fas fa-newspaper',   link: '/news' },
    ]);

    const newsPosts = ref([]);
    const loadingNews = ref(true);

    const dateLocale = computed(() => {
      if (i18n.locale === 'kz') return 'kk-KZ';
      if (i18n.locale === 'en') return 'en-US';
      return 'ru-RU';
    });

    const formatDate = (d) => {
      if (!d) return '';
      return new Date(d).toLocaleDateString(dateLocale.value, {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    };

    onMounted(async () => {
      loadingNews.value = true;
      try {
        const res = await apiService.get('/news');
        newsPosts.value = res.success ? res.data.slice(0, 6) : [];
      } catch {
        newsPosts.value = [];
      } finally {
        loadingNews.value = false;
      }
    });

    return { services, newsPosts, loadingNews, formatDate };
  }
}
</script>

<style scoped>
.home-page {
  padding-top: var(--header-height);
  min-height: 100vh;
  background: var(--bg-page);
}

/* Hero */
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

/* ── News preview ── */
.news-preview {
  padding: 0 0 4rem;
}

.news-state-msg {
  padding: 2rem 0;
  text-align: center;
  color: var(--text-hint);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.news-state-empty {
  padding: 3rem 0 4rem;
  text-align: center;
  color: var(--text-hint);
}

.news-state-empty i {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  display: block;
}

.news-posts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.news-post-card {
  display: block;
  text-decoration: none;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
}

.news-post-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary);
}

.news-post-img-wrap {
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  background: var(--bg-input);
}

.news-post-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.news-post-no-img {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: var(--text-hint);
}

.news-post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
}

.news-post-date {
  font-size: 0.8rem;
  color: var(--text-hint);
}

.news-post-meta .fa-external-link-alt {
  font-size: 0.8rem;
  color: var(--text-hint);
}

@media (max-width: 1024px) {
  .news-posts-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .news-posts-grid { grid-template-columns: 1fr; }
}
</style>

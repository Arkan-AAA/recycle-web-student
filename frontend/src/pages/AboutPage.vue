<template>
  <div class="about-page">
    <div class="container">

      <!-- Hero -->
      <div class="about-hero">
        <p class="eyebrow">Narxoz College</p>
        <h1>{{ $t('about.title') }}</h1>
        <p class="about-mission">"Learning today – leading tomorrow!"</p>
      </div>

      <!-- Статистика -->
      <div class="stats-grid">
        <div class="stat-card" v-for="s in stats" :key="s.label">
          <div class="stat-num">{{ s.num }}</div>
          <div class="stat-label">{{ $t(s.label) }}</div>
        </div>
      </div>

      <!-- О колледже -->
      <div class="section-grid">
        <div class="info-card">
          <div class="card-icon"><i class="fas fa-university"></i></div>
          <h2>{{ $t('about.profile') }}</h2>
          <p>{{ $t('about.profileText') }}</p>
        </div>
        <div class="info-card">
          <div class="card-icon"><i class="fas fa-user-tie"></i></div>
          <h2>{{ $t('about.director') }}</h2>
          <p class="director-name">Абайдуллаев Мақсат Серікболұлы</p>
          <p class="director-sub">{{ $t('about.directorTitle') }}</p>
        </div>
      </div>

      <!-- Специальности -->
      <div class="block">
        <h2 class="block-title"><i class="fas fa-graduation-cap"></i> {{ $t('about.specialties') }}</h2>
        <div class="spec-grid">
          <div class="spec-card" v-for="s in specialties" :key="s.code">
            <span class="spec-code">{{ s.code }}</span>
            <span class="spec-name">{{ s.name }}</span>
          </div>
        </div>
        <div class="duration-row">
          <div class="duration-item">
            <i class="fas fa-clock"></i>
            <div>
              <strong>{{ $t('about.base9') }}</strong>
              <span>2 {{ $t('about.years') }} 10 {{ $t('about.months') }}</span>
            </div>
          </div>
          <div class="duration-item">
            <i class="fas fa-clock"></i>
            <div>
              <strong>{{ $t('about.base11') }}</strong>
              <span>1 {{ $t('about.year') }} 10 {{ $t('about.months') }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Инфраструктура -->
      <div class="block">
        <h2 class="block-title"><i class="fas fa-building"></i> {{ $t('about.infrastructure') }}</h2>
        <div class="infra-grid">
          <div class="infra-card" v-for="item in infrastructure" :key="item.icon">
            <i :class="item.icon"></i>
            <h3>{{ $t(item.title) }}</h3>
            <p>{{ $t(item.desc) }}</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutPage',
  data() {
    return {
      stats: [
        { num: '1 053', label: 'about.statStudents' },
        { num: '11 154', label: 'about.statGrads' },
        { num: '56', label: 'about.statRooms' },
        { num: '7', label: 'about.statSpecs' },
        { num: '32', label: 'about.statMasters' },
      ],
      specialties: [
        { code: '04120100', name: 'Банковское и страховое дело' },
        { code: '04140100', name: 'Учет и аудит' },
        { code: '04130100', name: 'Менеджмент' },
        { code: '04140100', name: 'Маркетинг' },
        { code: '04210100', name: 'Правоведение' },
        { code: '06130100', name: 'Программное обеспечение' },
        { code: '06120100', name: 'Вычислительная техника и ИС' },
      ],
      infrastructure: [
        { icon: 'fas fa-book', title: 'about.infra.library', desc: 'about.infra.libraryDesc' },
        { icon: 'fas fa-home', title: 'about.infra.dorm', desc: 'about.infra.dormDesc' },
        { icon: 'fas fa-laptop', title: 'about.infra.cowork', desc: 'about.infra.coworkDesc' },
        { icon: 'fas fa-utensils', title: 'about.infra.canteen', desc: 'about.infra.canteenDesc' },
        { icon: 'fas fa-users', title: 'about.infra.clubs', desc: 'about.infra.clubsDesc' },
        { icon: 'fas fa-headset', title: 'about.infra.support', desc: 'about.infra.supportDesc' },
      ]
    }
  }
}
</script>

<style scoped>
.about-page { padding: 2.5rem 0 4rem; }

.about-hero {
  text-align: center;
  padding: 2rem 0 3rem;
}
.eyebrow {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--primary);
  margin-bottom: 0.75rem;
}
.about-hero h1 {
  font-size: 2.8rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 1rem;
}
.about-mission {
  font-size: 1.1rem;
  color: var(--text-secondary);
  font-style: italic;
}

/* Статистика */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  margin-bottom: 3rem;
}
.stat-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  padding: 1.5rem 1rem;
  text-align: center;
  transition: border-color 0.2s, transform 0.2s;
}
.stat-card:hover { border-color: var(--primary); transform: translateY(-2px); }
.stat-num {
  font-size: 2rem;
  font-weight: 800;
  color: var(--primary);
  line-height: 1;
  margin-bottom: 0.5rem;
}
.stat-label { font-size: 0.8rem; color: var(--text-secondary); }

/* Секции */
.section-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 3rem;
}
.info-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 2rem;
}
.card-icon {
  width: 52px; height: 52px;
  background: var(--primary-light);
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 1.25rem;
}
.card-icon i { font-size: 1.3rem; color: var(--primary); }
.info-card h2 { font-size: 1.1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.75rem; }
.info-card p { color: var(--text-secondary); line-height: 1.7; font-size: 0.95rem; }
.director-name { font-size: 1.1rem; font-weight: 600; color: var(--text-primary); margin-bottom: 0.25rem; }
.director-sub { font-size: 0.85rem; color: var(--text-secondary); }

/* Блоки */
.block { margin-bottom: 3rem; }
.block-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  padding-left: 1rem;
  border-left: 4px solid var(--primary);
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.block-title i { color: var(--primary); }

/* Специальности */
.spec-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}
.spec-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  padding: 1rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: border-color 0.2s;
}
.spec-card:hover { border-color: var(--primary); }
.spec-code {
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--primary);
  background: var(--primary-light);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  white-space: nowrap;
  flex-shrink: 0;
}
.spec-name { font-size: 0.9rem; color: var(--text-primary); }

.duration-row {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}
.duration-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  padding: 1rem 1.5rem;
}
.duration-item i { color: var(--primary); font-size: 1.2rem; }
.duration-item div { display: flex; flex-direction: column; gap: 0.1rem; }
.duration-item strong { font-size: 0.85rem; color: var(--text-primary); }
.duration-item span { font-size: 0.8rem; color: var(--text-secondary); }

/* Инфраструктура */
.infra-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
.infra-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  padding: 1.5rem;
  transition: border-color 0.2s, transform 0.2s;
}
.infra-card:hover { border-color: var(--primary); transform: translateY(-2px); }
.infra-card i { font-size: 1.5rem; color: var(--primary); margin-bottom: 0.75rem; display: block; }
.infra-card h3 { font-size: 0.95rem; font-weight: 600; color: var(--text-primary); margin-bottom: 0.5rem; }
.infra-card p { font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; }

@media (max-width: 1024px) {
  .stats-grid { grid-template-columns: repeat(3, 1fr); }
  .infra-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .about-hero h1 { font-size: 2rem; }
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
  .section-grid { grid-template-columns: 1fr; }
  .infra-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 480px) {
  .stats-grid { grid-template-columns: 1fr 1fr; }
  .infra-grid { grid-template-columns: 1fr; }
  .about-hero h1 { font-size: 1.6rem; }
}
</style>

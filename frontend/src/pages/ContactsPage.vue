<template>
  <div class="contacts-page">
    <div class="container">

      <div class="page-hero">
        <p class="eyebrow">{{ $t('contacts.eyebrow') }}</p>
        <h1>{{ $t('contacts.title') }}</h1>
      </div>

      <div class="contacts-grid">

        <!-- Основной кампус -->
        <div class="campus-card main-campus">
          <div class="campus-badge">{{ $t('contacts.mainCampus') }}</div>
          <h2>{{ $t('contacts.campus1') }}</h2>
          <div class="contact-list">
            <div class="contact-row">
              <i class="fas fa-map-marker-alt"></i>
              <span>{{ $t('contacts.mainAddress') }}</span>
            </div>
            <div class="contact-row">
              <i class="fas fa-phone"></i>
              <div class="phones">
                <a href="tel:+77273132028">{{ $t('contacts.mainPhone1') }}</a>
                <a href="tel:+77068080002">{{ $t('contacts.mainPhone2') }}</a>
                <a href="tel:+77068080004">{{ $t('contacts.mainPhone3') }}</a>
              </div>
            </div>
            <div class="contact-row">
              <i class="fas fa-envelope"></i>
              <a href="mailto:info@college-narxoz.kz">{{ $t('contacts.mainEmail') }}</a>
            </div>
            <div class="contact-row">
              <i class="fas fa-globe"></i>
              <a href="https://college.narxoz.kz" target="_blank">{{ $t('contacts.mainSite') }}</a>
            </div>
          </div>
        </div>

        <!-- Кампус Сайна -->
        <div class="campus-card">
          <div class="campus-badge secondary">{{ $t('contacts.campus2Badge') }}</div>
          <h2>{{ $t('contacts.campus2') }}</h2>
          <div class="contact-list">
            <div class="contact-row">
              <i class="fas fa-map-marker-alt"></i>
              <span>{{ $t('contacts.campus2Address') }}</span>
            </div>
            <div class="contact-row">
              <i class="fas fa-envelope"></i>
              <a href="mailto:global@narxoz.kz">{{ $t('contacts.campus2Email') }}</a>
            </div>
            <div class="contact-row">
              <i class="fas fa-door-open"></i>
              <span>{{ $t('contacts.room') }} {{ $t('contacts.campus2RoomId') }}</span>
            </div>
          </div>
        </div>

      </div>

      <!-- Отделы -->
      <div class="block">
        <h2 class="block-title"><i class="fas fa-sitemap"></i> {{ $t('contacts.departments') }}</h2>
        <div class="dept-grid">
          <div class="dept-card" v-for="d in departments" :key="d.email">
            <div class="dept-icon"><i :class="d.icon"></i></div>
            <div class="dept-info">
              <h3>{{ $t(d.name) }}</h3>
              <a :href="'mailto:' + d.email">{{ $t(d.emailKey) }}</a>
              <span v-if="d.roomKey" class="dept-room">{{ $t('contacts.room') }} {{ $t(d.roomKey) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Режим работы -->
      <div class="block">
        <h2 class="block-title"><i class="fas fa-clock"></i> {{ $t('contacts.hours') }}</h2>
        <div class="hours-grid">
          <div class="hours-card" v-for="h in workHours" :key="h.day">
            <span class="hours-day">{{ $t(h.day) }}</span>
            <span class="hours-time" :class="{ closed: h.closed }">
              {{ h.closed ? $t('contacts.closed') : $t(h.timeKey) }}
            </span>
          </div>
        </div>
      </div>

      <!-- Соцсети -->
      <div class="social-block">
        <h2 class="block-title"><i class="fas fa-share-alt"></i> {{ $t('contacts.social') }}</h2>
        <div class="social-links">
          <a href="https://instagram.com/narxoz_college" target="_blank" class="social-btn instagram">
            <i class="fab fa-instagram"></i> {{ $t('contacts.socialLinks.instagram') }}
          </a>
          <a href="https://t.me/narxoz_college" target="_blank" class="social-btn telegram">
            <i class="fab fa-telegram"></i> {{ $t('contacts.socialLinks.telegram') }}
          </a>
          <a href="https://facebook.com/narxozcollege" target="_blank" class="social-btn facebook">
            <i class="fab fa-facebook"></i> {{ $t('contacts.socialLinks.facebook') }}
          </a>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactsPage',
  data() {
    return {
      departments: [
        { icon: 'fas fa-user-graduate', name: 'contacts.dept.admission', email: 'admission@narxoz.kz', emailKey: 'contacts.dept.admissionEmail', roomKey: null },
        { icon: 'fas fa-headset', name: 'contacts.dept.support', email: 'support@narxoz.kz', emailKey: 'contacts.dept.supportEmail', roomKey: 'contacts.dept.supportRoom' },
        { icon: 'fas fa-globe', name: 'contacts.dept.international', email: 'global@narxoz.kz', emailKey: 'contacts.dept.internationalEmail', roomKey: 'contacts.dept.internationalRoom' },
      ],
      workHours: [
        { day: 'contacts.days.monFri', timeKey: 'contacts.workHours.monFriTime', closed: false },
        { day: 'contacts.days.sat', timeKey: 'contacts.workHours.satTime', closed: false },
        { day: 'contacts.days.sun', timeKey: 'contacts.workHours.sunTime', closed: true },
      ]
    }
  }
}
</script>

<style scoped>
.contacts-page { padding: 2.5rem 0 4rem; }

.page-hero { text-align: center; padding: 2rem 0 3rem; }
.eyebrow {
  font-size: 0.75rem; font-weight: 700; letter-spacing: 2px;
  text-transform: uppercase; color: var(--primary); margin-bottom: 0.75rem;
}
.page-hero h1 { font-size: 2.8rem; font-weight: 800; color: var(--text-primary); }

/* Кампусы */
.contacts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 3rem;
}
.campus-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 2rem;
  transition: border-color 0.2s;
}
.main-campus { border-color: var(--primary); }
.campus-badge {
  display: inline-block;
  background: var(--primary);
  color: white;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 1px;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  margin-bottom: 0.75rem;
  text-transform: uppercase;
}
.campus-badge.secondary { background: var(--bg-input); color: var(--text-secondary); }
.campus-card h2 { font-size: 1.1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 1.25rem; }

.contact-list { display: flex; flex-direction: column; gap: 0.875rem; }
.contact-row {
  display: flex;
  align-items: flex-start;
  gap: 0.875rem;
}
.contact-row i { color: var(--primary); font-size: 1rem; margin-top: 2px; flex-shrink: 0; width: 16px; }
.contact-row span, .contact-row a {
  font-size: 0.9rem;
  color: var(--text-secondary);
  text-decoration: none;
  line-height: 1.5;
}
.contact-row a:hover { color: var(--primary); }
.phones { display: flex; flex-direction: column; gap: 0.2rem; }

/* Блоки */
.block { margin-bottom: 3rem; }
.block-title {
  font-size: 1.2rem; font-weight: 700; color: var(--text-primary);
  margin-bottom: 1.5rem; padding-left: 1rem;
  border-left: 4px solid var(--primary);
  display: flex; align-items: center; gap: 0.75rem;
}
.block-title i { color: var(--primary); }

/* Отделы */
.dept-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
.dept-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  padding: 1.25rem;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  transition: border-color 0.2s;
}
.dept-card:hover { border-color: var(--primary); }
.dept-icon {
  width: 44px; height: 44px; flex-shrink: 0;
  background: var(--primary-light);
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
}
.dept-icon i { color: var(--primary); font-size: 1.1rem; }
.dept-info { display: flex; flex-direction: column; gap: 0.25rem; }
.dept-info h3 { font-size: 0.9rem; font-weight: 600; color: var(--text-primary); }
.dept-info a { font-size: 0.85rem; color: var(--primary); text-decoration: none; }
.dept-info a:hover { text-decoration: underline; }
.dept-room { font-size: 0.8rem; color: var(--text-hint); }

/* Часы работы */
.hours-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
.hours-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  padding: 1.25rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.hours-day { font-size: 0.9rem; font-weight: 500; color: var(--text-primary); }
.hours-time { font-size: 0.9rem; font-weight: 600; color: var(--primary); }
.hours-time.closed { color: var(--text-hint); }

/* Соцсети */
.social-block { margin-bottom: 2rem; }
.social-links { display: flex; gap: 1rem; flex-wrap: wrap; }
.social-btn {
  display: flex; align-items: center; gap: 0.6rem;
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: transform 0.2s, opacity 0.2s;
  color: white;
}
.social-btn:hover { transform: translateY(-2px); opacity: 0.9; }
.instagram { background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888); }
.telegram  { background: #2CA5E0; }
.facebook  { background: #1877F2; }

@media (max-width: 768px) {
  .contacts-grid { grid-template-columns: 1fr; }
  .dept-grid { grid-template-columns: 1fr; }
  .hours-grid { grid-template-columns: 1fr; }
  .page-hero h1 { font-size: 2rem; }
}
</style>

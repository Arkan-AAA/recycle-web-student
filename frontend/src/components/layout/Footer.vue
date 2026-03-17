<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import i18n from '../../i18n'

const route = useRoute()
const isAuthPage = computed(() => route.path === '/')
const locales = [
  { code: 'ru', label: 'РУС' },
  { code: 'kz', label: 'ҚАЗ' },
  { code: 'en', label: 'ENG' }
]
</script>

<template>
  <footer v-if="!isAuthPage" :class="$style.footer">
    <div :class="$style.inner">
      <span :class="$style.rights">{{ $t('footer.rights') }}</span>
      <div :class="$style.langGroup">
        <span :class="$style.langLabel">{{ $t('footer.language') }}</span>
        <button
          v-for="loc in locales"
          :key="loc.code"
          :class="[$style.langBtn, { [$style.active]: $i18n.locale === loc.code }]"
          @click="$i18n.setLocale(loc.code)"
        >
          {{ loc.label }}
        </button>
      </div>
    </div>
  </footer>
</template>

<style module>
.footer {
  width: 100%;
  background-color: #1e1e1e;
  color: #fff;
  padding: 0 32px;
  height: 50px;
  display: flex;
  align-items: center;
}

.inner {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.rights {
  font-size: 13px;
  color: #aaa;
}

.langGroup {
  display: flex;
  align-items: center;
  gap: 6px;
}

.langLabel {
  font-size: 13px;
  color: #aaa;
  margin-right: 4px;
}

.langBtn {
  background: transparent;
  border: 1px solid #555;
  color: #ccc;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  letter-spacing: 0.5px;
}

.langBtn:hover {
  border-color: #fff;
  color: #fff;
}

.active {
  background: #d50032;
  border-color: #d50032;
  color: #fff;
}
</style>

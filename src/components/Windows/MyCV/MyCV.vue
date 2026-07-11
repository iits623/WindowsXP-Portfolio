<script setup>
import { ref, computed } from 'vue'
import { useLocaleStore } from '@/stores/localeStore'

const localeStore = useLocaleStore()
const birthdate = new Date(1999, 8, 23)
const today = new Date()
let age = ref(today.getFullYear() - birthdate.getFullYear())

if (today.getMonth() < birthdate.getMonth() || (today.getMonth() === birthdate.getMonth() && today.getDate() < birthdate.getDate())) {
  age.value--
}

const currentLocale = computed(() => localeStore.currentLocale)
</script>

<template>
  <div class="relative right-0 h-content-window overflow-hidden">
    <div class="w-full h-full bg-white overflow-auto p-2">
      <div class="w-full h-full flex items-center justify-center">
        <img
          :src="currentLocale === 'fa' ? '/img/icons/cv/resume-fa.webp' : '/img/icons/cv/resume-en.webp'"
          :alt="currentLocale === 'fa' ? 'رزومه' : 'Resume'"
          class="w-full h-full object-contain"
        />
      </div>
    </div>
  </div>
  <a
    rel="noopener"
    :href="currentLocale === 'fa' ? '/img/icons/cv/resume-fa.webp' : '/img/icons/cv/resume-en.webp'"
    :download="currentLocale === 'fa' ? 'رزومه-من.webp' : 'my-resume.webp'"
    class="absolute bottom-2 right-1 md:right-4 h-6 text-xxs border border-twilight-blue bg-button-submit rounded-sm leading-loose px-3 hover:shadow-button-submit-hover cursor-pointer active:bg-button-clicked"
  >
    {{ $t('buttons.downloadCV') }}
  </a>
</template>

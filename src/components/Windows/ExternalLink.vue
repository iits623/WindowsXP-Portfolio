<script setup>
import { computed } from 'vue'
import { useLocaleStore } from '@/stores/localeStore'

const props = defineProps({
  externalLink: {
    type: String,
    default: ''
  }
})

const localeStore = useLocaleStore()

const openLink = () => {
  if (props.externalLink) {
    window.open(props.externalLink, '_blank')
  }
}
</script>

<template>
  <div class="w-full h-full bg-[#d4d0c8] flex items-center justify-center p-8">
    <div
      @click="openLink"
      class="bg-white border-2 border-gray-400 rounded-lg shadow-xl p-8 text-center cursor-pointer hover:border-blue-500 hover:shadow-2xl transition-all max-w-md w-full"
    >
      <!-- استفاده از آیکون موجود -->
      <img :src="`${$baseUrl}img/icons/contact/email-icon-lg.webp`" alt="Open link" class="w-24 h-24 mx-auto mb-4 opacity-70" />
      <h2 class="text-xl font-bold text-gray-800 font-tahoma">
        {{ localeStore.currentLocale === 'fa' ? 'باز کردن لینک' : 'Open Link' }}
      </h2>
      <p class="text-sm text-gray-500 mt-2 font-tahoma">
        {{ localeStore.currentLocale === 'fa' ? 'برای باز شدن در تب جدید کلیک کنید' : 'Click to open in new tab' }}
      </p>
      <div class="mt-4 text-xs text-blue-600 font-tahoma break-all">
        {{ props.externalLink }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.font-tahoma {
  font-family: 'Tahoma', 'Segoe UI', sans-serif;
}
</style>


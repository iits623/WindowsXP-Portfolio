<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const contactInfo = {
  phone: '0913 656 4194',
  telegram: '@bugfa',
  telegramLink: 'https://t.me/bugfa'
}

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text)
}
</script>

<template>
  <div class="relative right-0 h-full flex flex-col h-content-headless-toolbox">
    <div class="flex flex-col w-full h-full bg-white overflow-auto">
      <div class="flex flex-col items-center justify-center h-full p-6">
        <!-- شماره موبایل -->
        <div class="w-full max-w-md bg-white border border-gray-300 rounded p-2.5 mb-2.5 flex items-center justify-between hover:border-blue-400 transition-colors">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 bg-gradient-to-b from-[#3d8eff] to-[#245edc] rounded flex items-center justify-center flex-shrink-0">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <div>
              <p class="text-[9px] text-gray-500 font-trebuchet-pixel">{{ $t('contact.phone') }}</p>
              <p class="text-sm font-bold text-gray-800 font-trebuchet-pixel">{{ contactInfo.phone }}</p>
            </div>
          </div>
          <button
            @click="copyToClipboard(contactInfo.phone)"
            class="bg-gradient-to-b from-[#f0f0f0] to-[#d5d5d5] border border-gray-400 px-2.5 py-1 rounded text-[9px] font-trebuchet-pixel hover:border-blue-500 hover:shadow-inner transition-all active:bg-gray-300"
          >
            {{ $t('contact.copy') }}
          </button>
        </div>

        <!-- تلگرام -->
        <div class="w-full max-w-md bg-white border border-gray-300 rounded p-2.5 mb-2.5 flex items-center justify-between hover:border-blue-400 transition-colors">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 bg-gradient-to-b from-[#3d8eff] to-[#245edc] rounded flex items-center justify-center flex-shrink-0">
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.11-.2-.12-.06-.29-.04-.41-.02-.17.03-2.89 1.84-3.18 2.02-.27.17-.53.23-.83.23-.48-.01-.94-.13-1.35-.28-.57-.21-1.02-.32-.98-.68.02-.19.28-.38.77-.58 2.99-1.3 4.99-2.16 5.99-2.58 2.85-1.2 3.45-1.41 3.84-1.41.09 0 .28.02.41.12.11.08.15.19.16.31-.01.09.01.19-.02.29z"
                />
              </svg>
            </div>
            <div>
              <p class="text-[9px] text-gray-500 font-trebuchet-pixel">{{ $t('contact.telegram') }}</p>
              <a :href="contactInfo.telegramLink" target="_blank" rel="noopener noreferrer" class="text-sm font-bold text-blue-600 hover:underline font-trebuchet-pixel">
                {{ contactInfo.telegram }}
              </a>
            </div>
          </div>
          <button
            @click="copyToClipboard(contactInfo.telegram)"
            class="bg-gradient-to-b from-[#f0f0f0] to-[#d5d5d5] border border-gray-400 px-2.5 py-1 rounded text-[9px] font-trebuchet-pixel hover:border-blue-500 hover:shadow-inner transition-all active:bg-gray-300"
          >
            {{ $t('contact.copy') }}
          </button>
        </div>

        <!-- دکمه‌های اقدام -->
        <div class="w-full max-w-md mt-3.5 flex gap-2.5">
          <a
            :href="'tel:' + contactInfo.phone.replace(/\s/g, '')"
            class="flex-1 bg-gradient-to-b from-[#f0f0f0] to-[#d5d5d5] border-2 border-gray-400 text-center py-2 rounded text-[11px] font-medium font-trebuchet-pixel hover:border-blue-500 hover:shadow-inner transition-all active:bg-gray-300"
          >
            📞 {{ $t('contact.call') }}
          </a>
          <a
            :href="contactInfo.telegramLink"
            target="_blank"
            rel="noopener noreferrer"
            class="flex-1 bg-gradient-to-b from-[#f0f0f0] to-[#d5d5d5] border-2 border-gray-400 text-center py-2 rounded text-[11px] font-medium font-trebuchet-pixel hover:border-blue-500 hover:shadow-inner transition-all active:bg-gray-300"
          >
            💬 {{ $t('contact.message') }}
          </a>
        </div>

   
      </div>
    </div>
  </div>
</template>

<style scoped>
.font-trebuchet-pixel {
  font-family: 'Trebuchet MS', sans-serif;
}

button:active {
  transform: scale(0.98);
}
</style>


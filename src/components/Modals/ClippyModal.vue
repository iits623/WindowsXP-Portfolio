<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(false)
const isDismissed = ref(false)

const DELAY_MS = 20000
const STORAGE_KEY = 'clippyDismissed'

let timeoutId = null

const contactInfo = {
  id: '@bugfa',
  channel: '@pentifyteam'
}

onMounted(() => {
  const dismissed = localStorage.getItem(STORAGE_KEY)
  if (dismissed) {
    isDismissed.value = true
    return
  }

  timeoutId = setTimeout(() => {
    isVisible.value = true
  }, DELAY_MS)
})

onUnmounted(() => {
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
})

const closeModal = () => {
  isVisible.value = false
}

const dismissForever = () => {
  localStorage.setItem(STORAGE_KEY, 'true')
  isDismissed.value = true
  isVisible.value = false
}

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text)
}
</script>

<template>
  <Transition name="clippy">
    <div v-if="isVisible && !isDismissed" class="fixed bottom-16 right-4 z-fmax flex items-end gap-2">
      <div class="relative max-w-56">
        <div class="relative bg-gradient-to-b from-light-yellow to-amber-100 border border-black rounded p-3 shadow-md">
          <button class="modal-close cursor-pointer" @click="closeModal"></button>

          <div class="pr-3">
            <p class="text-sm font-bold text-black mb-2">ارتباط با من</p>
            <p class="text-xs text-black mb-3">راه‌های ارتباطی زیر در دسترس هستند:</p>

            <div class="flex flex-col gap-2">
              <div class="flex items-center justify-between gap-2 bg-white/50 rounded px-3 py-1.5 border border-gray-300">
                <span class="text-xs text-black">آیدی: {{ contactInfo.id }}</span>
                <button @click="copyToClipboard(contactInfo.id)" class="text-xs text-blue-600 hover:text-blue-800">کپی</button>
              </div>
              <div class="flex items-center justify-between gap-2 bg-white/50 rounded px-3 py-1.5 border border-gray-300">
                <span class="text-xs text-black">کانال: {{ contactInfo.channel }}</span>
                <button @click="copyToClipboard(contactInfo.channel)" class="text-xs text-blue-600 hover:text-blue-800">کپی</button>
              </div>
            </div>

            <button class="text-xxs text-gray-500 hover:text-gray-700 mt-3 underline cursor-pointer" @click="dismissForever">دیگر نمایش نده</button>
          </div>
        </div>

        <div class="absolute bottom-5 -right-2.5 w-0 h-0 border-l-[10px] border-l-black border-t-8 border-t-transparent border-b-8 border-b-transparent"></div>
        <div
          class="absolute bottom-5 -right-2 w-0 h-0 border-l-[9px] border-l-light-yellow border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent"
        ></div>
      </div>

      <img src="/videos/clippy.gif" alt="Clippy" class="w-20 md:w-24 h-auto cursor-pointer" @click="closeModal" />
    </div>
  </Transition>
</template>

<style scoped>
.clippy-enter-active {
  animation: clippy-bounce-in 0.5s ease-out;
}

.clippy-leave-active {
  animation: clippy-fade-out 0.3s ease-in;
}

.modal-close {
  outline: none;
  position: absolute;
  right: 6px;
  top: 6px;
  width: 14px;
  height: 14px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  background-color: transparent;
}

.modal-close::before {
  content: '';
  position: absolute;
  left: 5px;
  top: 2px;
  transform: rotate(45deg);
  height: 8px;
  width: 2px;
  background-color: rgba(170, 170, 170);
}

.modal-close:hover {
  background-color: #ffa90c;
  border-color: white;
  box-shadow: 1px 1px rgba(0, 0, 0, 0.1);
}

.modal-close:hover::before,
.modal-close:hover::after {
  background-color: white;
}

.modal-close::after {
  content: '';
  position: absolute;
  left: 5px;
  top: 2px;
  transform: rotate(-45deg);
  height: 8px;
  width: 2px;
  background-color: rgba(170, 170, 170);
}

@keyframes clippy-bounce-in {
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.8);
  }
  50% {
    transform: translateY(-5px) scale(1.02);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes clippy-fade-out {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(10px);
  }
}
</style>

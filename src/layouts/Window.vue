<template>
  <section
    class="absolute rounded-t-lg overflow-hidden select-none"
    :class="isActive ? 'bg-window-blue-active' : 'bg-window-blue-deactivated'"
    :style="windowStyle"
    :id="id"
  >
    <div
      class="absolute top-0 left-0 h-7 w-full z-40 flex justify-between items-center px-1"
      :class="isActive ? 'bg-header-window-active' : 'bg-header-window-deactivated'"
      @mousedown="startDrag"
    >
      <div class="h-5/6 text-white font-semibold flex items-center gap-1 select-none flex-1 overflow-hidden pr-1 min-w-0">
        <img :src="iconSrc" :alt="$t('common.tiny') + ' ' + $t('common.icon') + ' ' + translatedTitle" class="w-4 h-4 flex-shrink-0" />
        <div class="flex items-center overflow-hidden min-w-0">
          <h4 class="text-header-window text-header-shadow truncate whitespace-nowrap text-sm">{{ translatedTitle }}</h4>
        </div>
      </div>
      <div class="h-5/6 mt-px flex items-center gap-0.5 flex-shrink-0">
        <button @click="toggleMinimize" class="window-control-btn min-btn">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="5" width="9" height="1" fill="white" />
          </svg>
        </button>
        <button @click="toggleMaximize" :disabled="!resizable" class="window-control-btn max-btn" :class="{ 'opacity-40 cursor-not-allowed': !resizable }">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="9" height="9" stroke="white" stroke-width="1.2" fill="none" />
          </svg>
        </button>
        <button @click="closeWindow" class="window-control-btn close-btn">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 2L9 9M9 2L2 9" stroke="white" stroke-width="1.2" stroke-linecap="round" />
          </svg>
        </button>
      </div>
    </div>
    <div class="absolute w-full h-full overflow-hidden pt-7">
      <WindowHeaderDropdown :dropdownItems="translatedMenuHeaderItems" :windowsHeaderLogo="windowsHeaderLogo" />
      <div v-if="headerToolsId">
        <WindowHeaderTools :id="id" :headerToolsId="headerToolsId" />
        <WindowHeaderSearch :id="id" :title="translatedTitle" :iconSrc="iconSrc" :isSearchVisible="isSearchVisible" />
      </div>
      <slot></slot>
    </div>
    <div v-if="resizable">
      <div
        class="absolute bg-transparent top-0 right-0 w-2 h-full cursor-ew-resize"
        @mousedown="startResize"
        data-direction="right"
        :style="{ cursor: maximized ? 'default' : 'ew-resize' }"
      ></div>
      <div
        class="absolute bg-transparent bottom-0 left-0 h-2 w-full cursor-ns-resize"
        @mousedown="startResize"
        data-direction="bottom"
        :style="{ cursor: maximized ? 'default' : 'ns-resize' }"
      ></div>
      <div
        class="absolute bg-transparent bottom-0 right-0 w-2.5 h-2.5 cursor-nwse-resize"
        @mousedown="startResize"
        data-direction="corner"
        :style="{ cursor: maximized ? 'default' : 'nwse-resize' }"
      ></div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, inject, watch } from 'vue'
import { useLocaleStore } from '@/stores/localeStore'
import WindowHeaderTools from '../components/Windows/WindowHeaderTools.vue'
import WindowHeaderSearch from '../components/Windows/WindowHeaderSearch.vue'
import WindowHeaderDropdown from '../components/Windows/WindowHeaderDropdown.vue'
import menuHeaderData from '@/data/header-menu-data.json'

const emit = defineEmits()

const {
  id,
  title,
  iconSrc,
  initPositionX,
  initPositionY,
  initWidth,
  initHeight,
  minWidth,
  minHeight,
  headerToolsId,
  menuHeaderItemsId,
  resizable,
  windowsHeaderLogo,
  isSearchVisible
} = defineProps({
  id: String,
  title: Object,
  iconSrc: String,
  initPositionX: Number,
  initPositionY: Number,
  initWidth: Number,
  initHeight: Number,
  minWidth: Number,
  minHeight: Number,
  headerToolsId: String,
  menuHeaderItemsId: String,
  resizable: Boolean,
  windowsHeaderLogo: Boolean,
  isSearchVisible: Boolean
})

const localeStore = useLocaleStore()

const translatedTitle = ref(title[localeStore.currentLocale] || title['fr'])
const translatedMenuHeaderItems = ref(
  menuHeaderData.menuHeaderItems[menuHeaderItemsId][localeStore.currentLocale] || menuHeaderData.menuHeaderItems[menuHeaderItemsId]['fr']
)

watch(
  () => localeStore.currentLocale,
  (newLocale) => {
    translatedTitle.value = title[newLocale] || title['fr']
    const items = menuHeaderData.menuHeaderItems[menuHeaderItemsId]
    translatedMenuHeaderItems.value = items ? items[newLocale] || items['fr'] : []
  }
)

const appHeight = window.innerHeight - 32
const appWidth = window.innerWidth

const isDragging = ref(false)
const initialMouseX = ref(0)
const initialMouseY = ref(0)
const throttleDelay = 16
let lastUpdateTimestamp = 0

const maximized = ref(false)

const windowSize = { width: initWidth, height: initHeight }
const windowPosition = ref({ x: initPositionX, y: initPositionY })
const windowWidth = ref(windowSize.width)
const windowHeight = ref(windowSize.height)
const windowTransform = ref(`translate(${windowPosition.value.x}px, ${windowPosition.value.y}px)`)

const activeWindow = inject('activeWindow')
const isActive = computed(() => id === activeWindow.value)

const highestZIndex = inject('highestZIndex')

const windowStyle = computed(() => {
  const isMobile = window.innerWidth <= 768
  const sizeStyle =
    maximized.value || isMobile
      ? {
          width: '100vw',
          height: 'calc(100dvh - 2rem)',
          top: '0',
          left: '0'
        }
      : {
          width: `${windowWidth.value}px`,
          height: `${windowHeight.value}px`,
          transform: windowTransform.value
        }
  return {
    ...sizeStyle
  }
})

const toggleMaximize = () => {
  maximized.value = !maximized.value
}

const closeWindow = () => {
  emit('close-window')
}

const toggleMinimize = () => {
  emit('toggle-minimize')
}

const startDrag = (event) => {
  isDragging.value = true
  initialMouseX.value = event.clientX
  initialMouseY.value = event.clientY

  activeWindow.value = id

  highestZIndex.value++
  windowStyle.value.zIndex = highestZIndex.value

  document.addEventListener('mouseup', stopDrag)
  document.addEventListener('mousemove', dragWindow)
}

const stopDrag = () => {
  isDragging.value = false

  document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('mousemove', dragWindow)
}

const dragWindow = (event) => {
  if (isDragging.value && !resizing.value) {
    const currentTime = performance.now()
    if (currentTime - lastUpdateTimestamp > throttleDelay) {
      const deltaX = event.clientX - initialMouseX.value
      const deltaY = event.clientY - initialMouseY.value

      const newX = windowPosition.value.x + deltaX
      const newY = windowPosition.value.y + deltaY

      const minX = 0
      const minY = 0
      const maxX = window.innerWidth - windowSize.width / 10
      const maxY = window.innerHeight - windowSize.height / 10

      windowPosition.value.x = Math.min(Math.max(newX, minX), maxX)
      windowPosition.value.y = Math.min(Math.max(newY, minY), maxY)

      windowTransform.value = `translate(${windowPosition.value.x}px, ${windowPosition.value.y}px)`

      initialMouseX.value = event.clientX
      initialMouseY.value = event.clientY
      lastUpdateTimestamp = currentTime
    }
  }
}

const resizing = ref(false)
const initialWindowSize = ref({ width: 0, height: 0 })
const resizeDirection = ref('')

const startResize = (event) => {
  resizing.value = true
  initialMouseX.value = event.clientX
  initialMouseY.value = event.clientY
  resizeDirection.value = event.target.dataset.direction

  initialWindowSize.value = { width: windowWidth.value, height: windowHeight.value }

  document.addEventListener('mouseup', stopResize)
  document.addEventListener('mousemove', resizeWindow)
}

const stopResize = () => {
  resizing.value = false

  document.removeEventListener('mouseup', stopResize)
  document.removeEventListener('mousemove', resizeWindow)

  document.body.style.userSelect = ''
}

const resizeWindow = (event) => {
  if (resizing.value) {
    const deltaX = event.clientX - initialMouseX.value
    const deltaY = event.clientY - initialMouseY.value

    if (resizeDirection.value === 'right') {
      let newWidth = initialWindowSize.value.width + deltaX
      newWidth = Math.min(newWidth, appWidth)
      windowWidth.value = newWidth < minWidth ? minWidth : newWidth
    } else if (resizeDirection.value === 'bottom') {
      let newHeight = initialWindowSize.value.height + deltaY
      newHeight = Math.min(newHeight, appHeight)
      windowHeight.value = newHeight < minHeight ? minHeight : newHeight
    } else if (resizeDirection.value === 'corner') {
      let newWidth = initialWindowSize.value.width + deltaX
      let newHeight = initialWindowSize.value.height + deltaY
      newWidth = Math.min(newWidth, appWidth)
      newHeight = Math.min(newHeight, appHeight)
      windowWidth.value = newWidth < minWidth ? minWidth : newWidth
      windowHeight.value = newHeight < minHeight ? minHeight : newHeight
    }

    windowTransform.value = `translate(${windowPosition.value.x}px, ${windowPosition.value.y}px)`
  }
}
</script>

<style scoped>
.text-header-shadow {
  text-shadow: 1px 1px 0px #09177f;
}

.window-control-btn {
  width: 21px;
  height: 21px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  padding: 0;
  transition: background-color 0.15s ease;
}

.window-control-btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.close-btn:hover {
  background-color: #e81123 !important;
}

.window-control-btn:active {
  transform: scale(0.92);
}

.window-control-btn svg {
  display: block;
}
</style>


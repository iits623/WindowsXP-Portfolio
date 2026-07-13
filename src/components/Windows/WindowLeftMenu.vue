<script setup>
import { computed } from 'vue'
import { useLocaleStore } from '@/stores/localeStore'
import leftMenuData from '@/data/left-menu-data.json'

const props = defineProps({
  leftMenuType: {
    type: String,
    default: 'default'
  }
})

const emit = defineEmits(['item-click'])

const localeStore = useLocaleStore()

const menuItems = computed(() => {
  return leftMenuData.leftMenuItems[props.leftMenuType] || leftMenuData.leftMenuItems['default'] || []
})

const getLocalizedTitle = (item) => {
  return item.title[localeStore.currentLocale] || item.title['en']
}

const handleItemClick = (item) => {
  emit('item-click', getLocalizedTitle(item))
}
</script>

<template>
  <div class="w-[180px] min-w-[180px] h-full bg-[#d4d0c8] border-r-2 border-[#0a2a5e] p-2 overflow-auto">
    <div class="mb-2 pb-1 border-b border-[#a7a39a]">
      <span class="text-[11px] font-bold text-[#0a2a5e] font-tahoma tracking-wide">Common Tasks</span>
    </div>

    <div
      v-for="item in menuItems"
      :key="item.id"
      @click="handleItemClick(item)"
      class="flex items-center gap-2 px-2 py-1.5 mb-0.5 rounded-sm cursor-pointer hover:bg-[#316ac5] hover:text-white group transition-colors"
    >
      <img :src="item.iconHeader || '/img/icons/side-menu/folder-icon.webp'" alt="folder" class="w-8 h-8 object-contain" />
      <span class="text-xs text-[#0a2a5e] font-tahoma group-hover:text-white">
        {{ getLocalizedTitle(item) }}
      </span>
    </div>

  </div>
</template>

<style scoped>
.font-tahoma {
  font-family: 'Tahoma', 'Segoe UI', sans-serif;
}

.hover\:bg-\[\#316ac5\]:hover {
  background-color: #316ac5;
}

.bg-selected {
  background-color: #316ac5;
  color: white;
}
</style>


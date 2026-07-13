<script setup>
import { ref, reactive, watch, computed, onUnmounted } from 'vue'
import { useLocaleStore } from '@/stores/localeStore'
import { useGoBackStore } from '@/stores/goBackStore'

import projectData from '@/data/projects-data.json'
import WindowLeftMenu from '@/components/Windows/WindowLeftMenu.vue'

const props = defineProps({
  leftMenuType: String
})

const localeStore = useLocaleStore()
const goBackStore = useGoBackStore()

const selectedCategoryName = ref(null)

onUnmounted(() => {
  goBackStore.currentActiveProject = null
  selectedCategoryName.value = null
})

const categories = ref(
  projectData.categories.map((category) => ({
    ...category,
    projects: category.projects.map((project) => ({ ...project, isFocus: false, isActive: false }))
  }))
)

const state = reactive({
  selectedProject: null,
  selectedCategory: null
})

const focusProject = (project) => {
  if (project.isFocus) return
  project.isFocus = !project.isFocus
  categories.value.forEach((category) => {
    category.projects.forEach((p) => {
      if (p.name !== project.name) {
        p.isFocus = false
      }
    })
  })
  state.selectedProject = project
}

const toggleProject = (project) => {
  closeAllProjects()
  project.isActive = true
  state.selectedProject = project
  goBackStore.currentActiveProject = project
}

const closeAllProjects = () => {
  categories.value.forEach((category) => {
    category.projects.forEach((project) => {
      project.isActive = false
    })
  })
}

const getLocalizedCategoryName = (category) => {
  return category.name[localeStore.currentLocale] || category.name['en']
}

const handleLeftMenuItemClick = (categoryName) => {
  selectedCategoryName.value = categoryName

  const category = categories.value.find((c) => getLocalizedCategoryName(c) === categoryName || c.name.en === categoryName || c.name.fa === categoryName)

  if (category && category.projects.length > 0) {
    state.selectedCategory = category
    const firstProject = category.projects[0]
    toggleProject(firstProject)
  } else {
    goBackStore.currentActiveProject = null
    state.selectedCategory = null
  }
}

const currentCategoryProjects = computed(() => {
  if (!selectedCategoryName.value) return []

  const category = categories.value.find(
    (c) => getLocalizedCategoryName(c) === selectedCategoryName.value || c.name.en === selectedCategoryName.value || c.name.fa === selectedCategoryName.value
  )

  return category ? category.projects : []
})

const openLink = (link) => {
  if (link && link !== '' && link !== '#' && link !== null) {
    window.open(link, '_blank')
  } else {
    console.warn('لینکی برای این پروژه تعریف نشده است')
  }
}

const localizedEmptyTitle = computed(() => {
  return localeStore.currentLocale === 'fa' ? 'این پوشه خالی است' : 'This folder is empty'
})

const localizedEmptySubtitle = computed(() => {
  return localeStore.currentLocale === 'fa' ? 'از منوی سمت چپ یک آیتم را انتخاب کنید' : 'Select an item from the left menu'
})

const getLocalizedTitle = (project) => {
  return project?.title?.[localeStore.currentLocale] || project?.title?.['en'] || project?.name || 'بدون عنوان'
}

watch(
  () => goBackStore.currentActiveProject,
  (newProject) => {
    if (!newProject) {
      closeAllProjects()
    }
  },
  { immediate: true }
)

window.addEventListener('click', (e) => {
  if (!e.target.closest('.project-card') && state.selectedProject) {
    state.selectedProject.isFocus = false
    state.selectedProject = null
  }
})

defineExpose({
  handleLeftMenuItemClick,
  selectedCategoryName
})
</script>

<template>
  <div class="relative right-0 h-content-window flex">
    <WindowLeftMenu :leftMenuType="props.leftMenuType" @item-click="handleLeftMenuItemClick" />

    <div v-if="selectedCategoryName && currentCategoryProjects.length > 0" class="w-full h-full bg-white overflow-auto overflow-x-hidden pb-8 md:pb-5">
      <div class="m-2">
        <div class="w-full gap-4 mb-3">
          <h2 class="text-lg md:text-xl">{{ selectedCategoryName }}</h2>
        </div>
        <div class="flex flex-col gap-3">
          <div
            v-for="project in currentCategoryProjects"
            :key="project.name"
            @click="openLink(project.link)"
            class="flex items-center gap-4 p-4 w-full border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-400 cursor-pointer transition-all"
            :class="{ 'opacity-50 cursor-not-allowed': !project.link }"
          >
            <img :src="'/img/icons/' + project.icon" :alt="project.name" class="w-12 h-12 object-contain" />
            <div>
              <h3 class="text-base font-bold text-gray-800">{{ getLocalizedTitle(project) }}</h3>
              <p v-if="!project.link" class="text-xs text-gray-400">
                {{ localeStore.currentLocale === 'fa' ? 'لینکی تعریف نشده' : 'No link defined' }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="w-full h-full bg-[#d4d0c8] flex items-center justify-center">
      <div class="text-center">
        <img :src="`${$baseUrl}img/icons/folder-icon.webp`" class="w-20 h-20 mx-auto opacity-50" />
        <p class="text-sm text-gray-600 font-tahoma mt-3">{{ localizedEmptyTitle }}</p>
        <p class="text-xs text-gray-400 font-tahoma">{{ localizedEmptySubtitle }}</p>
      </div>
    </div>
  </div>
</template>


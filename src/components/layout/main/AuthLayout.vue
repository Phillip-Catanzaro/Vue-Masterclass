<script setup lang="ts">
import AppNewTask from '@/components/AppNew/AppNewTask.vue'
import { useMenu } from '@/composables/menu'

const { pageData } = storeToRefs(usePageStore())

const taskSheetOpen = ref(false)

const { menuOpen } = useMenu()
</script>

<template>
  <div>
    <Sidebar @taskClicked="taskSheetOpen = true" />
    <AppNewTask v-model="taskSheetOpen" />
    <div
      class="flex flex-col lg:ml-52 ml-24 transition-[margin]"
      :class="{ 'ml-52': menuOpen, 'ml-24': !menuOpen }"
    >
      <TopNavbar />
      <main class="flex flex-col flex-1 gap-4 p-4 lg:gap-6 lg:p-6">
        <div class="flex items-center">
          <h1 class="text-lg font-semibold md:text-2xl">
            {{ pageData.title }}
          </h1>
        </div>
        <slot />
      </main>
    </div>
  </div>
</template>

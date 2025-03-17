<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useMenu } from '@/composables/menu'

interface LinkProp {
  icon: string
  title: string
  to?: string
}

defineProps<{
  links: LinkProp[]
}>()

const emits = defineEmits<{
  actionClicked: [string]
}>()

const emitActionClicked = (linkTitle: string) => {
  emits('actionClicked', linkTitle)
}

const { menuOpen } = useMenu()
</script>

<template>
  <template v-for="link in links" :key="link.title">
    <RouterLink
      v-if="link.to"
      activeClass="text-primary bg-muted"
      :key="link.title"
      :to="link.to"
      class="flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary justify-center lg:justify-normal text-muted-foreground"
      :class="{ 'justify-center': menuOpen, 'justify-normal': !menuOpen }"
    >
      <iconify-icon :icon="link.icon"></iconify-icon>
      <span
        class="hidden lg:block text-nowrap"
        :class="{ block: menuOpen, hidden: !menuOpen }"
        >{{ link.title }}</span
      >
    </RouterLink>
    <div
      v-else
      @click="emitActionClicked(link.title)"
      class="flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary justify-center lg:justify-normal text-muted-foreground cursor-pointer"
      :class="{ 'justify-center': menuOpen, 'justify-normal': !menuOpen }"
    >
      <iconify-icon :icon="link.icon"></iconify-icon>
      <span
        class="hidden lg:block text-nowrap"
        :class="{ block: menuOpen, hidden: !menuOpen }"
        >{{ link.title }}</span
      >
    </div>
  </template>
</template>

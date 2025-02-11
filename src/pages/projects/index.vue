<script setup lang="ts">
import { columns } from '@/utils/tableColumns/projectsColumns'
import { type Projects, projectsQuery } from '@/utils/supaQueries'

usePageStore().pageData.title = 'Projects'

const projects = ref<Projects | null>(null)
const getProjects = async () => {
  const { data, error } = await projectsQuery

  if (error) console.log(error)

  projects.value = data
}

await getProjects()
</script>

<template>
  <DataTable v-if="projects" :data="projects" :columns="columns" />
</template>

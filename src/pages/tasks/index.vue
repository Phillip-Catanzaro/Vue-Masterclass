<script setup lang="ts">
import { useCollabs } from '@/composables/collabs'
import { useTasksStore } from '@/stores/loaders/tasks'
import { usePageStore } from '@/stores/page'
import { columns } from '@/utils/tableColumns/tasksColumns'

usePageStore().pageData.title = 'Tasks'

const tasksLoader = useTasksStore()
const { tasks } = storeToRefs(tasksLoader)
const { getTasks } = tasksLoader

await getTasks()

const { getGroupedCollabs, groupedCollabs } = useCollabs()

await getGroupedCollabs(tasks.value ?? [])

const columnsWithCollabs = columns(groupedCollabs)

await getTasks()
</script>

<template>
  <DataTable v-if="tasks" :columns="columnsWithCollabs" :data="tasks" />
</template>

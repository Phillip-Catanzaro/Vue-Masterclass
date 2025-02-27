<script setup lang="ts">
import { useCollabs } from '@/composables/collabs'
import { useProjectsStore } from '@/stores/loaders/projects'

const { slug } = useRoute('/projects/[slug]').params
const slugVar = ref(Array.isArray(slug) ? slug[0] : slug)

const projectsLoader = useProjectsStore()
const { project } = storeToRefs(projectsLoader)
const { getProject, updateProject } = projectsLoader

watch(
  () => project.value?.name,
  () => {
    usePageStore().pageData.title = `Project: ${project.value?.name || ''}`
  }
)

await getProject(slugVar.value)

const { getProfileByIds } = useCollabs()
const collabs = project.value?.collaborators
  ? await getProfileByIds(project.value.collaborators)
  : []
</script>

<template>
  <Table v-if="project">
    <TableRow>
      <TableHead> Name </TableHead>
      <TableCell>
        <AppInPlaceEdit v-model="project.name" @commit="updateProject" />
      </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Description </TableHead>
      <TableCell>
        <AppInPlaceEditTextArea
          v-model="project.description"
          @commit="updateProject"
        />
      </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Status </TableHead>
      <TableCell>
        <AppInPlaceEditStatus
          v-model="project.status"
          @commit="updateProject"
        />
      </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Collaborators </TableHead>
      <TableCell>
        <div class="flex">
          <Avatar
            class="-mr-4 border border-primary hover:scale-110 transition-transform"
            v-for="collab in collabs"
            :key="collab.id"
          >
            <RouterLink
              class="w-full h-full flex items-center justify-center"
              :to="{
                name: '/users/[username]',
                params: { username: collab.username }
              }"
            >
              <AvatarImage :src="collab.avatar_url || ''" alt="" />
              <AvatarFallback> </AvatarFallback>
            </RouterLink>
          </Avatar>
        </div>
      </TableCell>
    </TableRow>
  </Table>

  <section
    v-if="project"
    class="mt-10 flex flex-col md:flex-row gap-5 justify-between grow"
  >
    <div class="flex-1">
      <h2 class="mb-4">Tasks</h2>
      <div class="table-container">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead> Name </TableHead>
              <TableHead> Status </TableHead>
              <TableHead> Due Date </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="task in project.tasks" :key="task.id">
              <TableCell class="p-0">
                <RouterLink
                  class="text-left block hover:bg-muted p-4"
                  :to="{ name: '/tasks/[id]', params: { id: task.id } }"
                >
                  {{ task.name }}
                </RouterLink>
              </TableCell>
              <TableCell>
                <AppInPlaceEditStatus
                  readonly
                  :modelValue="task.status"
                ></AppInPlaceEditStatus>
              </TableCell>
              <TableCell> 22/08/2024 </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
    <div class="flex-1">
      <h2 class="mb-4">Documents</h2>
      <div class="table-container">
        <p class="text-muted-foreground text-sm font-semibold px-4 py-3">
          This project doesn't have documents yet...
        </p>
        <!-- <Table>
          <TableHeader>
            <TableRow>
              <TableHead> Name </TableHead>
              <TableHead> Visibility </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell> Lorem ipsum dolor sit amet. </TableCell>
              <TableCell> Private </TableCell>
            </TableRow>
          </TableBody>
        </Table> -->
      </div>
    </div>
  </section>
</template>

<style scoped>
@import 'tailwindcss/tailwind.css';

th {
  width: 100px;
}

h2 {
  width: fit-content;
  font-weight: semibold;
  font-size: large;
}

.table-container {
  overflow: hidden;
  overflow-y: auto;
  background-color: rgb(15 23 42);
  height: 80rem;
  border-radius: 1rem;
}

.border-b {
  border-color: rgb(23, 33, 56);
}
</style>

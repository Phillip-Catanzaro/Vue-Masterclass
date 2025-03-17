<script setup lang="ts">
import { useCollabs } from '@/composables/collabs'
import { useTasksStore } from '@/stores/loaders/tasks'

const { id } = useRoute('/tasks/[id]').params
const idVar = Array.isArray(id) ? id[0] : id

const tasksLoader = useTasksStore()
const { task } = storeToRefs(tasksLoader)
const { getTask, updateTask, deleteTask } = tasksLoader

watch(
  () => task.value?.name,
  () => {
    usePageStore().pageData.title = `Task: ${task.value?.name || ''}`
  }
)

await getTask(idVar)

const { getProfileByIds } = useCollabs()
const collabs = task.value?.collaborators
  ? await getProfileByIds(task.value.collaborators)
  : []

const router = useRouter()
const triggerDelete = async () => {
  deleteLoading.value = true
  await deleteTask()
  deleteLoading.value = false
  router.push('/tasks')
}
const deleteLoading = ref(false)
</script>

<template>
  <div class="flex flex-col justify-center items-center">
    <Table v-if="task">
      <TableRow>
        <TableHead> Name </TableHead>
        <TableCell>
          <AppInPlaceEdit v-model="task.name" @commit="updateTask" />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableHead> Description </TableHead>
        <TableCell>
          <AppInPlaceEditTextArea
            v-model="task.description"
            @commit="updateTask"
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableHead> Project </TableHead>
        <TableCell> {{ task.projects?.name }}</TableCell>
      </TableRow>
      <TableRow>
        <TableHead> Status </TableHead>
        <TableCell>
          <AppInPlaceEditStatus v-model="task.status" @commit="updateTask" />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableHead> Collaborators </TableHead>
        <TableCell>
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
        </TableCell>
      </TableRow>
      <TableRow class="hover:bg-transparent">
        <TableHead class="align-top pt-4"> Comments </TableHead>
        <TableCell>
          Comments cards goes in here..
          <div
            class="flex flex-col justify-between p-3 bg-muted my-2 rounded-md"
          >
            <textarea
              placeholder="Add your comment.."
              class="w-full max-w-full overflow-y-auto prose-sm prose border rounded dark:prose-invert hover:border-muted bg-background border-muted p-3"
            >
            </textarea>
            <div class="flex justify-between mt-3">
              <Button> Comment </Button>
              <div class="flex gap-4">
                <button variant="ghost" @click.prevent>
                  <iconify-icon icon="lucide:paperclip"></iconify-icon>
                  <span class="sr-only">Attach file</span>
                </button>
                <button variant="ghost" @click.prevent>
                  <iconify-icon icon="lucide:image-up"></iconify-icon>
                  <span class="sr-only">Upload image</span>
                </button>
              </div>
            </div>
          </div>
        </TableCell>
      </TableRow>
    </Table>
    <Button
      @click="triggerDelete"
      class="self-end mt-3 w-full max-w-40"
      variant="destructive"
    >
      <Transition name="scale" mode="out-in">
        <iconify-icon
          v-if="deleteLoading"
          icon="lucide:loader-circle"
          class="mr-1 animate-spin"
        ></iconify-icon>
        <iconify-icon v-else icon="lucide:trash" class="mr-1"></iconify-icon>
      </Transition>

      Delete Task
    </Button>
  </div>
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

<script setup lang="ts">
const router = useRouter()

const errorStore = useErrorStore()

const error = ref(errorStore.activeError)

const message = ref('')
const customCode = ref(0)
const details = ref('')
const code = ref('')
const hint = ref('')
const statusCode = ref(0)

if (error.value && !('code' in error.value)) {
  message.value = error.value.message
  customCode.value = error.value.customCode ?? 0
}

if (error.value && 'code' in error.value) {
  message.value = error.value.message
  details.value = error.value.details
  hint.value = error.value.hint
  code.value = error.value.code
  statusCode.value = error.value.statusCode ?? 0
}

const ErrorTemplate = import.meta.env.DEV
  ? defineAsyncComponent(() => import('./AppErrorDevSection.vue'))
  : defineAsyncComponent(() => import('./AppErrorProdSection.vue'))

router.afterEach(() => {
  errorStore.clearError()
})
</script>

<template>
  <section class="error">
    <ErrorTemplate
      :message
      :customCode
      :code
      :statusCode
      :hint
      :details
      :isCustomError="errorStore.isCustomError"
    />
  </section>
</template>

<style scoped>
p {
  margin: 0.5rem 0;
}
.error {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 2rem;
  text-align: center;
  min-height: 90vh;
}
</style>

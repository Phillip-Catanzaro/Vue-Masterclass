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
  code.value = error.value.code
  hint.value = error.value.hint
  statusCode.value = error.value.statusCode ?? 0
}

router.afterEach(() => {
  errorStore.activeError = null
})
</script>

<template>
  <section
    class="error mx-auto flex justify-center items-center flex-1 p-10 text-center -mt-20 min-h-[90vh]"
  >
    <div>
      <iconify-icon
        icon="lucide:triangle-alert"
        class="error__icon text-7xl text-destructive"
      />
      <h1 class="error__code font-extrabold text-7xl text-secondary">
        {{ customCode || code }}
      </h1>
      <p
        class="error__code font-extrabold text-7xl text-secondary"
        v-if="statusCode"
      >
        Status Code: {{ statusCode }}
      </p>
      <p class="error__msg text-3xl font-extrabold text-primary">
        {{ message }}
      </p>
      <p class="error__msg text-3xl font-extrabold text-primary" v-if="hint">
        {{ hint }}
      </p>
      <p class="error__msg text-3xl font-extrabold text-primary" v-if="details">
        {{ details }}
      </p>
      <div
        class="error-footer flex flex-col items-center justify-center gap-5 mt-6 font-light"
      >
        <p class="error-footer__text text-lg text-muted-foreground">
          You'll find lots to explore on the home page.
        </p>
        <RouterLink to="/">
          <Button class="max-w-36"> Back to homepage </Button>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
p {
  margin: 0.5rem 0;
}
</style>

<script setup lang="ts">
const props = defineProps<{
  message: string
  customCode: number
  statusCode: number
  isCustomError: boolean
}>()

const error = ref({
  msg: '',
  code: 500
})

if (props.isCustomError) {
  error.value.code = props.customCode
  error.value.msg = props.message
}

if (props.statusCode === 406) {
  error.value.code = 404
  error.value.msg = "Sorry we couldn't find this page."
}
</script>
<template>
  <div>
    <iconify-icon
      icon="lucide:triangle-alert"
      class="error__icon text-7xl text-destructive"
    />
    <h1 class="error__code font-extrabold text-7xl text-secondary">
      {{ error.code }}
    </h1>
    <p class="error__msg text-3xl font-extrabold text-primary">
      {{ error.msg }}
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
</template>

<script setup lang="ts">
defineProps<{
  message: string
  customCode: number
  details: string
  statusCode: number
  hint: string | null
  code: string
}>()
</script>
<template>
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
</template>

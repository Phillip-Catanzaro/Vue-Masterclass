export const usePageStore = defineStore('page-store', () => {
  const pageData = ref({
    title: 'Home'
  })

  return { pageData }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePageStore, import.meta.hot))
}

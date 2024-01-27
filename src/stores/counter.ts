import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUsersStore = defineStore('counter', () => {
  const count = ref([])

  return { count }
})

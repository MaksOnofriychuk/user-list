<template>
  <div class="delete__modal">
    <p class="delete__modal_text">You definitely want to delete this user Janet ?</p>
    <div class="delete__modal_buttons">
      <button @click="closeDeleteModal">Cancel</button>
      <button @click="handleDeleteUser">Delete</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ICloseModalEmit, IUserDeleteModalProps } from './interfaces'
import { useUsersStore } from '@/stores/usersStore'

const { deleteUser } = useUsersStore()

const props = defineProps<IUserDeleteModalProps>()

const emits = defineEmits<ICloseModalEmit>()

const closeDeleteModal = () => {
  emits('close-modal')
}

const handleDeleteUser = () => {
  deleteUser(props.userId)
  closeDeleteModal()
}
</script>

<style lang="scss" scoped>
@import './UserDeleteModalView.scss';
</style>

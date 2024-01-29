<template>
  <header class="header">
    <h1 class="header__title">{{ title }}</h1>
    <button class="header__button" @click="openModal">{{ buttonText }}</button>
    <ModalLayout :is-show-modal="isModalOpen" :title="'Create User'" @click="closeModal">
      <UserFormView :is-modal-open="isModalOpen" mode="create" @close-modal="closeModal" />
    </ModalLayout>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { IHeaderProps } from './interfaces'
import ModalLayout from '@/layouts/ModalLayout/ModalLayout.vue'
import UserFormView from '@/components/UserForm/UserFormView.vue'

const isModalOpen = ref(false)

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

defineProps<IHeaderProps>()
</script>

<style lang="scss" src="./Header.scss"></style>

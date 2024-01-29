<template>
  <div>
    <div class="user__item">
      <div class="user__info">
        <div class="user__info_avatar">
          <img :src="userInfo.avatar || DefaultUserLogo" />
        </div>
      </div>

      <div class="user__info_text">
        <p class="text__firstName">{{ userInfo.first_name }}</p>
        <p class="text__lastName">{{ userInfo.last_name }}</p>
        <p class="text__email">{{ userInfo.email }}</p>
      </div>

      <div class="user__buttons">
        <button class="user__button_edit" @click="openEditModal"><img :src="EditIcon" /></button>
        <button class="user__button_delete" @click="openDeleteModal">
          <img :src="DeleteIcon" />
        </button>
      </div>
    </div>

    <ModalLayout :is-show-modal="isOpenEditModal" :title="'Edit User'" @click="closeEditModal">
      <UserFormView
        :is-modal-open="isOpenEditModal"
        :user-info="props.userInfo"
        mode="edit"
        @close-modal="closeEditModal"
      />
    </ModalLayout>

    <ModalLayout
      :title="'Delete User'"
      :is-show-modal="isOpenDeleteModal"
      @click="closeDeleteModal"
    >
      <UserDeleteModalView :user-id="props.userInfo.id" @close-modal="closeDeleteModal" />
    </ModalLayout>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import EditIcon from '../../assets/icons/edit.svg'
import type { IUserItemProps } from './interfaces'
import DeleteIcon from '../../assets/icons/delete.svg'
import UserFormView from '../UserForm/UserFormView.vue'
import ModalLayout from '@/layouts/ModalLayout/ModalLayout.vue'
import DefaultUserLogo from '@/assets/images/default-user-image.png'
import UserDeleteModalView from '../UserDeleteModal/UserDeleteModalView.vue'

const props = defineProps<IUserItemProps>()

const isOpenEditModal = ref(false)
const isOpenDeleteModal = ref(false)

const openEditModal = () => {
  isOpenEditModal.value = true
}

const closeEditModal = () => {
  isOpenEditModal.value = false
}

const openDeleteModal = () => {
  isOpenDeleteModal.value = true
}

const closeDeleteModal = () => {
  isOpenDeleteModal.value = false
}
</script>

<style lang="scss" scoped>
@import './UserItem.View.scss';
</style>

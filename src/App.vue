<template>
  <MainLayout>
    <HeaderView title="User Management" button-text="Create User" />
    <UserListView v-if="!!users.length" :users="users" />
    <div v-else>User Not Found</div>
    <div class="pagination__wrapper">
      <div
        v-for="page in totalPage"
        :key="page"
        class="page"
        :class="{
          current_page: page === pageNumber
        }"
        @click="handleChangeCurrentPage(page)"
      >
        {{ page }}
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted, onBeforeUnmount } from 'vue'
import { useUsersStore } from '@/stores/usersStore'
import { vaultService } from './core/services/local-storage'
import HeaderView from '@/components/Header/HeaderView.vue'
import MainLayout from '@/layouts/MainLayout/MainLayout.vue'
import UserListView from '@/components/UserList/UserListView.vue'

const { getAllUsers, changeCurrentPage } = useUsersStore()
const { users, totalPage, pageNumber } = storeToRefs(useUsersStore())

onMounted(() => {
  getAllUsers()
})

onBeforeUnmount(() => {
  vaultService.clear()
})

const handleChangeCurrentPage = (page: number) => {
  changeCurrentPage(page)
  getAllUsers()
}
</script>

<style>
@import './main.scss';
</style>

<template>
  <div class="scroll">
    <TransitionGroup name="list" tag="div" class="user__list">
      <UserItemView v-for="userInfo in users" :key="userInfo.id" :user-info="userInfo" />
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import type { IUsers } from './interfaces'
import UserItemView from '../UserItem/UserItemView.vue'

defineProps<IUsers>()
</script>

<style lang="scss" scoped>
@import './UserListView.scss';
</style>

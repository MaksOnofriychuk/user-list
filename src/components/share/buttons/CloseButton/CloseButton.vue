<template>
  <button class="close__button" @click="($event) => emit('click', $event)">
    <img alt="close button" :src="CloseIcon" />
  </button>
</template>

<script setup lang="ts">
import CloseIcon from '@/assets/icons/close.svg'
import type { ICloseButtonEmit } from './interfaces'

const emit = defineEmits<ICloseButtonEmit>()
</script>

<style lang="scss" scoped></style>

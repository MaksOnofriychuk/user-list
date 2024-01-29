<template>
  <div v-show="isShowModal" class="modal__wrapper">
    <div
      v-for="(color, index) in ['pink', 'blue', 'green', 'orange']"
      :key="index"
      class="ellipse"
      :class="`ellipse--${color}`"
    ></div>

    <div class="top_wrap">
      <h3 class="modal__title">{{ title || '' }}</h3>
      <CloseButton class="close__modal-btn" @click="emit('click', $event)" />
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { IModalLayoutEmits, IModalProps } from './interfaces'
import CloseButton from '@/components/share/buttons/CloseButton/CloseButton.vue'

defineProps<IModalProps>()

const emit = defineEmits<IModalLayoutEmits>()
</script>

<style lang="scss" scoped>
@import './ModalLayout.scss';
</style>

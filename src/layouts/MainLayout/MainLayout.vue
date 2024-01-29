<template>
  <div class="wrapper">
    <div
      v-for="(color, index) in ['pink', 'blue', 'green', 'orange']"
      :key="index"
      class="ellipse"
      :class="`ellipse--${color}`"
    ></div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@import './MainLayout.scss';
</style>

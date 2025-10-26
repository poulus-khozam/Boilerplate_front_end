<template>
  <button :class="['base-button', variant]" v-bind="$attrs">
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: '' // e.g., 'secondary', 'danger'
  }
});
</script>

<style scoped>
/* Scoped styles can be added here if needed, but globals handle the base */
</style>

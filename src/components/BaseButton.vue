<template>
  <button :class="buttonClass" v-bind="$attrs">
    <slot></slot>
  </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'primary' // Default to primary
  }
});

const buttonClass = computed(() => {
  // Maps variant prop to Bootstrap button classes
  const variantMap = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'btn-danger',
    success: 'btn-success',
    warning: 'btn-warning',
    info: 'btn-info',
    light: 'btn-light',
    dark: 'btn-dark'
  };
  return ['btn', variantMap[props.variant] || 'btn-primary'];
});
</script>
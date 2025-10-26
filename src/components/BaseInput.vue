<template>
  <div class="form-group">
    <label v-if="label" :for="uuid">{{ label }}</label>
    <input
      class="base-input"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :id="uuid"
      v-bind="$attrs"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';

// Define props and emits for v-model compatibility
defineProps({
  label: {
    type: String,
    default: ''
  },
  modelValue: {
    type: [String, Number],
    default: ''
  }
});

defineEmits(['update:modelValue']);

// Generate a unique ID for the input to link the label
const uuid = computed(() => 'input-' + Math.random().toString(36).substring(2, 9));
</script>

<style scoped>
/* Scoped styles can be added here for variations if needed */
</style>

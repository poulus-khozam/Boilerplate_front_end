<template>
  <div class="mb-3">
    <label v-if="label" :for="uuid" class="form-label">{{ label }}</label>
    <input
      class="form-control"
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

 

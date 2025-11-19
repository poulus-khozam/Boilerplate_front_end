<template>
  <div class="modal fade show" tabindex="-1" style="display: block;" aria-modal="true" role="dialog">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Change Password</h5>
          <button type="button" class="btn-close" @click="$emit('close')" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div v-if="error" class="alert alert-danger">{{ error }}</div>
          <div v-if="success" class="alert alert-success">{{ success }}</div>
          
          <form @submit.prevent="handleChangePassword">
            <BaseInput
              v-model="oldPassword"
              label="Old Password"
              type="password"
              placeholder="Enter your current password"
              required
            />
            <BaseInput
              v-model="newPassword"
              label="New Password"
              type="password"
              placeholder="Enter your new password"
              required
            />
            <BaseInput
              v-model="confirmPassword"
              label="Confirm New Password"
              type="password"
              placeholder="Confirm your new password"
              required
            />
            <BaseButton type="submit" class="w-100">Update Password</BaseButton>
          </form>
        </div>
        <div class="modal-footer">
          <BaseButton variant="secondary" @click="$emit('close')">Close</BaseButton>
        </div>
      </div>
    </div>
  </div>
  <div class="modal-backdrop fade show"></div>
</template>

<script setup>
import { ref } from 'vue';
import BaseInput from './BaseInput.vue';
import BaseButton from './BaseButton.vue';
import AuthService from '../services/authService'; // <-- 1. IMPORT THE SERVICE


// Define emits to communicate with the parent component
defineEmits(['close']);

const oldPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const error = ref(null);
const success = ref(null);

const handleChangePassword = async () => {
  error.value = null;
  success.value = null;

  if (newPassword.value !== confirmPassword.value) {
    error.value = "New passwords do not match.";
    return;
  }

  try {
    const response = await AuthService.changePassword({
      oldPassword: oldPassword.value,
      newPassword: newPassword.value
    });
    
    // Assuming the server returns a success message
    success.value = response.data.message || "Password updated successfully!";
    
    // Clear the form fields on success
    oldPassword.value = '';
    newPassword.value = '';
    confirmPassword.value = '';

  } catch (err) {
    // Display the error message from the server's response
    if (err.response && err.response.data && err.response.data.detail) {
      error.value = err.response.data.detail;
    } else {
      error.value = 'An unexpected error occurred. Please try again.';
    }
  }
}; 
</script>
<template>
  <div class="container mt-5 mb-5">
    <div class="card shadow-sm">
      <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <h3 class="mb-0">User Profile</h3>
        <small>Manage your contact information</small>
      </div>
      <div class="card-body">
        
        <!-- Alerts -->
        <div v-if="message" :class="['alert', isError ? 'alert-danger' : 'alert-success']" role="alert">
          {{ message }}
        </div>

        <form @submit.prevent="saveProfile">
          <div class="row">
            <!-- Contact Info -->
            <div class="col-md-6">
              <h5 class="text-muted mb-3">Contact Details</h5>
              
              <BaseInput
                v-model="form.mobile"
                label="Mobile Number"
                placeholder="e.g., 0109999999"
              />

              <BaseInput
                v-model="form.internal"
                label="Internal Number"
                placeholder="e.g., 1234"
              />

              <BaseInput
                v-model="form.email"
                label="Email Address"
                type="email"
                placeholder="user@example.com"
              />
            </div>

            <!-- Other Info -->
            <div class="col-md-6">
              <h5 class="text-muted mb-3">Additional Info</h5>
              
              <BaseInput
                v-model="form.car"
                label="Car Number"
                placeholder="e.g., ABC 123"
              />

              <BaseInput
                v-model="form.linkedin"
                label="LinkedIn Profile"
                placeholder="https://linkedin.com/in/..."
              />

              <BaseInput
                v-model="form.facebook"
                label="Facebook Profile"
                placeholder="https://facebook.com/..."
              />
            </div>
          </div>

          <hr class="my-4">

          <div class="d-flex justify-content-end gap-2">
            <router-link to="/welcome" class="btn btn-secondary">Cancel</router-link>
            <BaseButton type="submit" :disabled="isLoading">
              <span v-if="isLoading" class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
              Save Changes
            </BaseButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import UserService from '../services/userService';
import BaseInput from '../components/BaseInput.vue';
import BaseButton from '../components/BaseButton.vue';

// Form State
const form = reactive({
  mobile: '',
  internal: '',
  car: '',
  email: '',
  linkedin: '',
  facebook: ''
});

// UI State
const isLoading = ref(false);
const message = ref(null);
const isError = ref(false);

// Mapping Configuration
const STD_CODE = 2;
const CODE_MAP = {
  mobile: 1,
  internal: 2,
  car: 3,
  email: 4,
  linkedin: 5,
  facebook: 6
};

const saveProfile = async () => {
  isLoading.value = true;
  message.value = null;
  isError.value = false;

  try {
    // Transform form data into the API structure
    const updates = Object.keys(form)
      .filter(key => form[key] && form[key].trim() !== '') // Only send fields that have values
      .map(key => ({
        std_code: STD_CODE,
        code: CODE_MAP[key],
        data: form[key]
      }));

    if (updates.length === 0) {
      isLoading.value = false;
      message.value = "No changes to save.";
      isError.value = true;
      return;
    }

    // Call Bulk Update API
    const response = await UserService.bulkUpdateUserInfo(updates);
    
    message.value = response.data.message || "Profile updated successfully!";
    isError.value = false;

  } catch (error) {
    console.error(error);
    isError.value = true;
    if (error.response && error.response.data) {
      message.value = error.response.data.detail || "Failed to update profile.";
    } else {
      message.value = "Network error or server is unreachable.";
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.card {
  max-width: 900px;
  margin: 0 auto;
}
</style>
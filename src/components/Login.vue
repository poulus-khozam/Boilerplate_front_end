<template>
  <AuthModal :error="error" @close="handleCancel">
    <form @submit.prevent="handleLogin">
      <BaseInput
        v-model="username"
        label="Username"
        type="text"
        placeholder="Enter Username"
        required
      />
      <BaseInput
        v-model="password"
        label="Password"
        type="password"
        placeholder="Enter Password"
        required
      />
      <BaseButton type="submit">Login</BaseButton>
    </form>
    <template #footer>
      <BaseButton variant="danger" @click="handleCancel">Cancel</BaseButton>
    </template>
  </AuthModal>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import AuthModal from './AuthModal.vue';
import BaseInput from './BaseInput.vue';
import BaseButton from './BaseButton.vue';

const username = ref('');
const password = ref('');
const error = ref(null);
const router = useRouter();
const auth = useAuthStore();

const handleLogin = async () => {
  error.value = null;
  const success = await auth.login({ username: username.value, password: password.value });
  if (success) {
    router.push({ name: 'VerifyTotp' });
  } else {
    error.value = auth.error;
  }
};

const handleCancel = () => {
  username.value = '';
  password.value = '';
  error.value = null;
};
</script>

<!-- The <style> block is no longer needed here -->

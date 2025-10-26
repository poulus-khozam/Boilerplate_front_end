<template>
  <AuthModal title="Enter Authentication Code" :error="error" @close="goBack">
    <form @submit.prevent="handleVerify">
      <BaseInput
        v-model="totpCode"
        label="TOTP Code"
        type="text"
        placeholder="Enter 6-digit code"
        maxlength="6"
        required
        style="text-align: center; letter-spacing: 0.5em;"
      />
      <BaseButton type="submit">Verify</BaseButton>
    </form>
    <template #footer>
      <BaseButton variant="secondary" @click="goBack">Back</BaseButton>
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

const totpCode = ref('');
const error = ref(null);
const router = useRouter();
const auth = useAuthStore();

const handleVerify = async () => {
  error.value = null;
  const success = await auth.verifyTotp(totpCode.value);
  if (success) {
    router.push({ name: 'Welcome' });
  } else {
    error.value = auth.error;
  }
};

const goBack = () => {
  router.push({ name: 'Login' });
};
</script>

<!-- The <style> block is no longer needed here -->

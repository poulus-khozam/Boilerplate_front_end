<template>
  <div class="card">
    <h2>Enter Authentication Code</h2>
    <form @submit.prevent="handleVerify">
      <div>
        <label for="totp">TOTP Code:</label>
        <input type="text" v-model="totpCode" id="totp" required />
      </div>
      <button type="submit">Verify</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const totpCode = ref('')
const error = ref(null)
const router = useRouter()
const auth = useAuthStore()

const handleVerify = async () => {
  const success = await auth.verifyTotp(totpCode.value)
  if (success) {
    router.push({ name: 'Welcome' })
  } else {
    error.value = auth.error
  }
}
</script>

<style scoped>
.card {
  width: 300px;
  padding: 20px;
  margin: auto;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>

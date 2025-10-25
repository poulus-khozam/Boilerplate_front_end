<template>
  <div class="card">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">Username:</label>
        <input type="text" v-model="username" id="username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" id="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const username = ref('')
const password = ref('')
const error = ref(null)
const router = useRouter()
const auth = useAuthStore()

const handleLogin = async () => {
  const success = await auth.login({ username: username.value, password: password.value })
  if (success) {
    router.push({ name: 'VerifyTotp' })
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

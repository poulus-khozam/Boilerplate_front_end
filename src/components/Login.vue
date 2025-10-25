<template>
  <div class="login-modal-overlay">
    <div class="login-modal-card">
      <button class="close-button">&times;</button>
      
      <img src="../assets/images/npc-logo.png" alt="N.P.C. Logo" class="logo" />
      
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Username</label>
          <input 
            type="text" 
            v-model="username" 
            id="username" 
            placeholder="Enter Username" 
            required 
          />
        </div>
        
        <div class="form-group">
          <label for="password">Password</label>
          <input 
            type="password" 
            v-model="password" 
            id="password" 
            placeholder="Enter Password" 
            required 
          />
        </div>
        
        <button type="submit" class="login-button">Login</button>
      </form>

      <div class="modal-footer">
         <button class="cancel-button">Cancel</button>
      </div>

      <p v-if="error" class="error-message">{{ error }}</p>
    </div>
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
  error.value = null; // Clear previous errors
  const success = await auth.login({ username: username.value, password: password.value })
  if (success) {
    router.push({ name: 'VerifyTotp' })
  } else {
    error.value = auth.error
  }
}
</script>

<style scoped>
.login-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.login-modal-card {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  width: 100%;
  max-width: 450px;
  position: relative;
  font-family: Arial, sans-serif;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 15px;
  border: none;
  background: none;
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  cursor: pointer;
}

.logo {
  display: block;
  width: 150px;
  height: auto;
  margin: 0 auto 2rem auto;
}

.form-group {
  margin-bottom: 1.5rem;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #555;
}

.form-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box; /* Important for padding */
  font-size: 1rem;
}

.login-button {
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 4px;
  background-color: #1de9b6; /* A nice green color */
  color: white;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #00bfa5;
}

.modal-footer {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-start;
}

.cancel-button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #e53935; /* Red color */
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.cancel-button:hover {
  background-color: #c62828;
}

.error-message {
  margin-top: 1rem;
  color: #e53935;
  font-weight: bold;
}
</style>

<template>
  <div class="totp-modal-overlay">
    <div class="totp-modal-card">
      <button class="close-button">&times;</button>
      
      <img src="../assets/images/npc-logo.png" alt="N.P.C. Logo" class="logo" />
      
      <h2>Enter Authentication Code</h2>
      
      <form @submit.prevent="handleVerify">
        <div class="form-group">
          <label for="totp_code">TOTP Code</label>
          <input 
            type="text" 
            v-model="totpCode" 
            id="totp_code" 
            placeholder="Enter 6-digit code"
            maxlength="6"
            required 
          />
        </div>
        
        <button type="submit" class="verify-button">Verify</button>
      </form>

      <div class="modal-footer">
         <button class="cancel-button" @click="goBack">Back</button>
      </div>

      <p v-if="error" class="error-message">{{ error }}</p>
    </div>
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
  error.value = null; // Clear previous errors
  const success = await auth.verifyTotp(totpCode.value)
  if (success) {
    router.push({ name: 'Welcome' })
  } else {
    error.value = auth.error
  }
}

const goBack = () => {
  router.push({ name: 'Login' });
}
</script>

<style scoped>
.totp-modal-overlay {
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

.totp-modal-card {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  width: 100%;
  max-width: 450px;
  position: relative;
  font-family: Arial, sans-serif;
  text-align: center;
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
  margin: 0 auto 1.5rem auto;
}

h2 {
  margin-bottom: 2rem;
  color: #333;
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
  box-sizing: border-box;
  font-size: 1.2rem;
  text-align: center;
  letter-spacing: 0.5em; /* Spreads out the numbers */
}

.verify-button {
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 4px;
  background-color: #1de9b6; /* Green color */
  color: white;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.verify-button:hover {
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
  background-color: #757575; /* Gray color for 'Back' */
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.cancel-button:hover {
  background-color: #616161;
}

.error-message {
  margin-top: 1rem;
  color: #e53935;
  font-weight: bold;
}
</style>

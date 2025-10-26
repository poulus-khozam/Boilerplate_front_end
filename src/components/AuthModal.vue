<template>
  <div class="auth-modal-overlay">
    <div class="auth-modal-card">
      <button @click="$emit('close')" class="close-button">&times;</button>
      
      <img src="../assets/images/npc-logo.png" alt="N.P.C. Logo" class="logo" />
      
      <h2 v-if="title">{{ title }}</h2>

      <slot></slot>

      <div class="modal-footer">
        <slot name="footer"></slot>
      </div>

      <p v-if="error" class="error-message">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  error: String
})
defineEmits(['close'])
</script>

<style scoped>
.auth-modal-overlay {
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

.auth-modal-card {
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

.modal-footer {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-start;
}

.error-message {
  margin-top: 1rem;
  color: #e53935;
  font-weight: bold;
}
</style>

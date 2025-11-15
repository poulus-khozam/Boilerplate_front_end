<template>
  <div class="welcome-container">
    <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom shadow-sm mb-4">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <a class="navbar-brand mx-auto" href="#">شركه النصر للبترول</a>
        <div class="d-flex">
           <a href="#" @click.prevent="handleLogout" class="text-secondary" title="Logout">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
           </a>
        </div>
      </div>
    </nav>
    <main class="container">
      <div class="text-center">
        <p>Welcome to the main page.</p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  // Clear any authentication tokens and user state
  auth.logout();
  // Redirect to the login page
  router.push({ name: 'Login' });
};
</script>

<style scoped>
.welcome-container {
  width: 100%;
}

/* Adjust for larger screens where #app has different padding */
@media (min-width: 1024px) {
  /* On large screens, the app is a grid, this will span the component across both columns */
  .welcome-container {
    grid-column: 1 / -1;
  }
}
</style>
 
 



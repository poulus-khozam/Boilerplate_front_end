<template>
  <div class="welcome-container w-100 vh-100">
    <nav class="navbar navbar-expand-lg navbar-light border-bottom shadow-sm" style="background: linear-gradient(to right, white , #0dd6fd ); ">
      <div class="container-fluid d-flex justify-content-between align-items-center">
        <!-- Company Logo on the left -->
        <a class="navbar-brand" href="#">
          <img :src="npcLogo" alt="NPC Logo" style="height: 40px;">
        </a>

        <!-- Dropdown Menu on the right -->
        <div class="dropdown">
          <!-- Employee Picture as dropdown toggle -->
          <a href="#" role="button" id="userMenu" data-bs-toggle="dropdown" aria-expanded="false">
            <img 
              v-if="employeeImageUrl" 
              :src="employeeImageUrl" 
              class="rounded-circle" 
              alt="Employee Picture" 
              style="height: 40px; width: 40px; object-fit: cover; cursor: pointer;"
              @error="onImageError"
            >
            <!-- Fallback Icon: Displayed if the image fails to load -->
            <img
              v-else
              src="@/assets/images/default-avatar.png"
              class="rounded-circle"
              alt="Default Avatar"
              style="height: 40px; width: 40px; object-fit: cover; cursor: pointer;"
            >
          </a>

          <!-- Dropdown Menu -->
          <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userMenu">
            <li><a class="dropdown-item" href="#">About</a></li>
            <li><a class="dropdown-item" href="#">Change Password</a></li>
            <li><a class="dropdown-item" href="#">Settings</a></li> 
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#" @click.prevent="handleLogout">Logout</a></li>
          </ul>
        </div>
      </div>
    </nav>
    <main class="container mt-4">
      <div class="text-center">
        <p>Welcome to the main page.</p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import npcLogo from '@/assets/images/npc-logo.png';

const auth = useAuthStore();
const router = useRouter();
const imageHasError = ref(false); // State to track if the employee image failed to load

// A computed property to decide which image URL to use
const employeeImageUrl = computed(() => {
  if (imageHasError.value || !auth.username) {
    // If there was an error or no username, return null to trigger the fallback
    return null;
  }
  return `https://mynpc.nasroil.com/emp/pic_2025_9/${auth.username}.jpg`;
});

// This function is called if the employee image fails to load (e.g., 404 Not Found)
const onImageError = () => {
  imageHasError.value = true;
};

const handleLogout = () => {
  auth.logout();
  router.push({ name: 'Login' });
};
</script>

<style scoped>
/* Ensure the container uses the full height and lays out content vertically */
.welcome-container {
  display: flex;
  flex-direction: column;
}

/* Allow the main content area to grow */
main.container {
  flex-grow: 1;
}
</style>
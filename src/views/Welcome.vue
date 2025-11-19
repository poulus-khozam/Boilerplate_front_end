<template>
  <!-- The ChangePassword modal will be rendered on top of everything when active -->
  <ChangePassword v-if="showChangePasswordModal" @close="toggleChangePasswordModal" />

  <div class="welcome-container w-100 vh-100">
    <nav class="navbar navbar-expand-lg navbar-light border-bottom shadow-sm">
      <div class="container-fluid d-flex justify-content-between align-items-center">
        <!-- Company Logo on the left -->
        <a class="navbar-brand" href="#">
          <img :src="npcLogo" alt="NPC Logo" style="height: 40px;">
        </a>

        <!-- Dropdown Menu on the right -->
        <div class="dropdown">
          <a href="#" role="button" id="userMenu" data-bs-toggle="dropdown" aria-expanded="false">
            <img 
              v-if="employeeImageUrl" 
              :src="employeeImageUrl" 
              class="rounded-circle" 
              alt="Employee Picture" 
              style="height: 40px; width: 40px; object-fit: cover; cursor: pointer;"
              @error="onImageError"
            >
            <img
              v-else
              src="@/assets/images/default-avatar.png"
              class="rounded-circle"
              alt="Default Avatar"
              style="height: 40px; width: 40px; object-fit: cover; cursor: pointer;"
            >
          </a>

          <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userMenu">
            <!-- Use router-link for navigation -->
            <li><router-link :to="{ name: 'About' }" class="dropdown-item">About</router-link></li>
            <li><a class="dropdown-item" href="#" @click.prevent="toggleChangePasswordModal">Change Password</a></li>
            <li><a class="dropdown-item" href="#">Settings</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#" @click.prevent="handleLogout">Logout</a></li>
          </ul>
        </div>
      </div>
    </nav>
    <main class="container mt-4">
      <!-- THIS IS THE CRITICAL PART -->
      <!-- It will now render Home.vue or About.vue based on the URL -->
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import npcLogo from '@/assets/images/npc-logo.png';
import ChangePassword from '@/components/ChangePassword.vue';

const auth = useAuthStore();
const router = useRouter();
const imageHasError = ref(false);
const showChangePasswordModal = ref(false);

const employeeImageUrl = computed(() => {
  if (imageHasError.value || !auth.username) {
    return null;
  }
  return `https://mynpc.nasroil.com/emp/pic_2025_9/${auth.username}.jpg`;
});

const onImageError = () => {
  imageHasError.value = true;
};

const toggleChangePasswordModal = () => {
  showChangePasswordModal.value = !showChangePasswordModal.value;
};

const handleLogout = () => {
  auth.logout();
  router.push({ name: 'Login' });
};
</script>

<style scoped>
.navbar {
  background-image: linear-gradient(to right, #e0f7fa, #b2ebf2);
}

.welcome-container {
  display: flex;
  flex-direction: column;
}

main.container {
  flex-grow: 1;
}
</style>
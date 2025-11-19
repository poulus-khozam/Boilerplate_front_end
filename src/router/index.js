import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import VerifyTotp from '../components/VerifyTotp.vue'
import Welcome from '../views/Welcome.vue'
import About from '../views/About.vue'
import Home from '../views/Home.vue' // <-- 1. IMPORT HOME
import { useAuthStore } from '../stores/auth'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/verify-totp',
    name: 'VerifyTotp',
    component: VerifyTotp,
    beforeEnter: (to, from, next) => {
      const auth = useAuthStore()
      if (auth.loginToken) {
        next()
      } else {
        next({ name: 'Login' })
      }
    }
  },
  // v-- 2. MODIFY THIS ENTIRE ROUTE OBJECT --v
  {
    path: '/welcome',
    name: 'Welcome',
    component: Welcome,
    beforeEnter: (to, from, next) => {
      const auth = useAuthStore()
      if (auth.accessToken) {
        next()
      } else {
        next({ name: 'Login' })
      }
    },
    // Add children for nested routing
    children: [
      {
        path: '', // Default child route for /welcome
        name: 'WelcomeHome',
        component: Home
      },
      {
        path: 'about', // Child route for /welcome/about
        name: 'About',
        component: About
      }
    ]
  }
  // ^-- THE 'ABOUT' ROUTE IS NOW NESTED INSIDE --^
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import VerifyTotp from '../components/VerifyTotp.vue'
import Welcome from '../views/Welcome.vue'
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
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

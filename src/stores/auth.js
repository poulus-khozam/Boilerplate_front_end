import { defineStore } from 'pinia'
import AuthService from '../services/authService'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    loginToken: null,
    accessToken: null,
    error: null
  }),
  persist: true, // Enable persistence for this store
  actions: {
    async login(user) {
      try {
        const response = await AuthService.login(user)
        this.loginToken = response.data.access_token
        this.error = null
        return true
      } catch (error) {
        if (error.response) {
          this.error = error.response.data.detail || 'Login failed: Invalid credentials.'
        } else if (error.request) {
          this.error = 'Network Error: Could not connect to the API. Is the server running?'
        } else {
          this.error = error.message
        }
        return false
      }
    },
    async verifyTotp(totpCode) {
      try {
        const response = await AuthService.verifyTotp(this.loginToken, totpCode)
        this.accessToken = response.data.access_token
        this.loginToken = null
        this.error = null
        return true
      } catch (error) {
        this.error = error.response.data.detail || 'TOTP verification failed'
        return false
      }
    },
    logout() {
      this.loginToken = null
      this.accessToken = null
    }
  }
})

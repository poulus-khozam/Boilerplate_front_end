import { defineStore } from 'pinia'
import AuthService from '../services/authService'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    loginToken: null,
    accessToken: null,
    error: null
  }),
  actions: {
    async login(user) {
      try {
        const response = await AuthService.login(user)
        this.loginToken = response.data.access_token
        this.error = null
        return true
      } catch (error) {
        // --- REVISED ERROR HANDLING ---
        if (error.response) {
           // The request was made and the server responded with a status code
           // that falls out of the range of 2xx
          this.error = error.response.data.detail || 'Login failed: Invalid credentials.';
        } else if (error.request) {
           // The request was made but no response was received
           // `error.request` is an instance of XMLHttpRequest in the browser
           this.error = 'Network Error: Could not connect to the API. Is the server running?';
        } else {
           // Something happened in setting up the request that triggered an Error
           this.error = error.message;
        }
        return false;
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

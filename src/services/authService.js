import axios from 'axios'
import { useAuthStore } from '../stores/auth' // Import the store to get the token


const API_URL = 'http://0.0.0.0:5000'

class AuthService {
  login(user) {
    const params = new URLSearchParams()
    params.append('username', user.username)
    params.append('password', user.password)
    return axios.post(`${API_URL}/login`, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }

  verifyTotp(loginToken, totpCode) {
    return axios.post(`${API_URL}/verify-totp`, {
      login_token: loginToken,
      totp_code: totpCode
    })
  }

  changePassword(passwords) {
    const auth = useAuthStore()
    const token = auth.accessToken

    // Make sure you have a token before making the request
    if (!token) {
      return Promise.reject('No access token found.')
    }

    return axios.post(`${API_URL}/change-password`, {
      old_password: passwords.oldPassword,
      new_password: passwords.newPassword
    }, {
      headers: {
        // This is crucial for the server to know who you are
        'Authorization': `Bearer ${token}`
      }
    })
  }
}

export default new AuthService()

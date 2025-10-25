import axios from 'axios'

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
}

export default new AuthService()

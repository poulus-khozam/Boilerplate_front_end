import axios from 'axios'
import { useAuthStore } from '../stores/auth'

const API_URL = 'http://0.0.0.0:5000'

class UserService {
  // Helper to get headers
  _getHeaders() {
    const auth = useAuthStore()
    const token = auth.accessToken
    if (!token) return {}
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }

  /**
   * Update a single field
   * Payload: { std_code: 2, code: number, data: string }
   */
  updateUserInfo(payload) {
    return axios.post(`${API_URL}/user_info`, payload, {
      headers: this._getHeaders()
    })
  }

  /**
   * Bulk update multiple fields
   * Payload: { updates: [ { std_code: 2, code: number, data: string }, ... ] }
   */
  bulkUpdateUserInfo(updatesArray) {
    return axios.post(`${API_URL}/user_info/bulk`, {
      updates: updatesArray
    }, {
      headers: this._getHeaders()
    })
  }
}

export default new UserService()
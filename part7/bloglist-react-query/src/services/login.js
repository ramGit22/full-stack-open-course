import axios from 'axios'
import 'dotenv/config'

const baseUrl = process.env.REACT_APP_API_URL

const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}/login`, credentials)
  console.log('response', response)
  return response.data
}

export default login

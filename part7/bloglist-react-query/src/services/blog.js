import axios from 'axios'
// import 'dotenv/config'
const baseUrl = 'http://localhost:3003/api/blogs'

// const baseUrl = process.env.REACT_APP_API_URL

let token = null
const setToken = (newToken) => {
  token = `Bearer ${newToken}`
  localStorage.setItem('token', token)
}

const getToken = () => {
  return localStorage.getItem('token')
}

const fetchBlogPosts = async () => {
  try {
    const token = getToken()
    const config = {
      headers: { Authorization: token },
    }
    const response = await axios.get(baseUrl, config)
    // const response = await axios.get(`${baseUrl}/blogs`, config)

    return response.data
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    throw error // Rethrow the error for handling in the UI or other parts of the application
  }
}

export { fetchBlogPosts, setToken }

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

const createBlogPost = async (credentials) => {
  try {
    const token = getToken()
    const config = {
      headers: { Authorization: token },
    }
    const response = await axios.post(baseUrl, credentials, config)
    console.log('response', response.data)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

const addLike = async (id, updatedBlog, token) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.put(`${baseUrl}/${id}`, updatedBlog, config)
  return request.then((response) => response.data)
}

const deletePost = async (id, token) => {
  const config = {
    headers: { Authorization: token },
  }
  return axios.delete(`${baseUrl}/${id}`, config)
}

export {
  fetchBlogPosts,
  setToken,
  createBlogPost,
  addLike,
  deletePost,
  getToken,
}

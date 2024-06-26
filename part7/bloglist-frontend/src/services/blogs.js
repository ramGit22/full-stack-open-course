import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.get(baseUrl, config)
  return request.then((response) => response.data)
}

const create = (credentials) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.post(baseUrl, credentials, config)
  return request.then((response) => response.data)
}

const likeUpdate = (id, updatedBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  return axios
    .put(`${baseUrl}/${id}`, updatedBlog, config)
    .then((response) => response.data)
}

const blogDelete = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, setToken, create, likeUpdate, blogDelete }

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

const create = async (credentials) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.post(baseUrl, credentials, config)
  return request.then((response) => response.data)
}

const remove = async (id) => {
  console.log('token', token)
  const config = {
    headers: { Authorization: token },
  }
  return axios.delete(`${baseUrl}/${id}`, config)
}
export default { getAll, setToken, create, remove }

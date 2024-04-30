import React, { useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { fetchBlogPosts, setToken } from './services/blog'
import CreateBlog from './components/CreateBlog'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { data } = useQuery({
    queryKeys: ['posts'],
    queryFn: fetchBlogPosts,
  })

  const mutation = useMutation({
    mutationFn: async (credential) => {
      const response = await axios.post(
        'http://localhost:3003/api/login',
        credential
      )
      setToken(response.data.token)

      return response.data
    },
  })

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          mutation.mutate({ username, password })
        }}
      >
        <div>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value)
            }}
          />
        </div>
        <div>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </div>
        <button>Login</button>
      </form>
      <CreateBlog />
      {data?.map((post) => (
        <div>{post.title}</div>
      ))}
    </div>
  )
}

export default App

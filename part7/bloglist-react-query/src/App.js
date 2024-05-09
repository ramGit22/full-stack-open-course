import React, { useState } from 'react'
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import {
  fetchBlogPosts,
  setToken,
  addLike,
  getToken,
  deletePost,
} from './services/blog'
import CreateBlog from './components/CreateBlog'

function App() {
  const queryClient = useQueryClient()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const { data } = useQuery({
    queryKeys: ['posts', isLoggedIn],
    queryFn: fetchBlogPosts,
    enabled: isLoggedIn,
  })

  const mutation = useMutation({
    mutationFn: async (credential) => {
      const response = await axios.post(
        'http://localhost:3003/api/login',
        credential
      )
      setToken(response.data.token)
      setIsLoggedIn(true)
      return response.data
    },
  })

  const likeMutation = useMutation({
    mutationFn: async (postId) => {
      const token = getToken()

      const updatedBlogIndex = data.findIndex((post) => post.id === postId)
      if (updatedBlogIndex === -1) {
        // Handle error, blog post not found
        return
      }

      const updatedBlog = {
        ...data[updatedBlogIndex],
        likes: data[updatedBlogIndex].likes + 1,
      }
      console.log('updatedBlog', updatedBlog)

      try {
        await addLike(postId, updatedBlog, token)
      } catch (error) {
        console.log(error)
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries('posts')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (postId) => {
      const token = getToken()
      try {
        await deletePost(postId, token)
      } catch (error) {
        console.log(error)
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries('posts')
    },
  })
  return (
    <div>
      {!isLoggedIn ? (
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
      ) : null}

      {isLoggedIn ? (
        <>
          <CreateBlog />
          {data?.map((post) => (
            <div>
              {' '}
              <div>
                {post.title} has {post.likes} likes
              </div>
              <button onClick={() => likeMutation.mutate(post.id)}>Like</button>
              <button onClick={() => deleteMutation.mutate(post.id)}>
                Delete
              </button>
            </div>
          ))}
        </>
      ) : null}
    </div>
  )
}

export default App

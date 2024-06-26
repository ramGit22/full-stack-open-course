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
  const [loggedInUser, setLoggedInUser] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)

  const { data } = useQuery({
    queryKey: ['posts', isLoggedIn],
    queryFn: fetchBlogPosts,
    enabled: isLoggedIn,
  })
  console.log('data', data)

  const mutation = useMutation({
    mutationFn: async (credential) => {
      const response = await axios.post(
        'http://localhost:3003/api/login',
        credential
      )
      console.log('loginData', response.data)
      setToken(response.data.token)
      setLoggedInUser(response.data.username)
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

  const handleLogOut = () => {
    setIsLoggedIn(false)
  }

  const handleUserClick = (user) => {
    setSelectedUser(user)
  }

  const filteredPosts = selectedUser
    ? data?.filter((post) => post.user.username === selectedUser.username)
    : data

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
          <div>{loggedInUser} has logged in</div>
          <button onClick={handleLogOut}>Log Out</button>
          <CreateBlog />
          {filteredPosts?.map((post) => (
            <div key={post.id}>
              <div onClick={() => handleUserClick(post.user)}>
                {post.user.username} has {post.user.blogs.length} blogs
              </div>
            </div>
          ))}
          {selectedUser && (
            <div>
              <h3>Blogs by {selectedUser.username}</h3>
              <button onClick={() => setSelectedUser(null)}>Back</button>
              {filteredPosts?.map((post) => (
                <div key={post.id}>
                  <div>
                    {post.user.blogs} has {''}
                    {post.likes}
                  </div>
                  <button onClick={() => likeMutation.mutate(post.id)}>
                    Like
                  </button>
                  <button onClick={() => deleteMutation.mutate(post.id)}>
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      ) : null}
    </div>
  )
}

export default App

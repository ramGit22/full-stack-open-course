import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { createBlogPost } from '../services/blog'
import Notification from './Notification'
import { addNotification } from '../features/notificationSlice'
import { useDispatch } from 'react-redux'

const CreateBlog = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const queryClient = useQueryClient()
  const [showNotification, setShowNotification] = useState(false)
  const dispatch = useDispatch()

  const mutation = useMutation({
    mutationFn: createBlogPost,
    onSuccess: (data) => {
      queryClient.invalidateQueries('posts')
      setTitle('')
      setAuthor('')
      dispatch(
        addNotification({
          id: Date.now(),
          title: `${data.title} added`,
          type: 'success',
        })
      )
    },
  })

  const handleCreate = (e) => {
    e.preventDefault()
    mutation.mutate({ title, author })
    setShowNotification(true)
  }
  return (
    <div>
      {showNotification && <Notification />}
      <form onSubmit={handleCreate}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button>Create</button>
      </form>
    </div>
  )
}

export default CreateBlog

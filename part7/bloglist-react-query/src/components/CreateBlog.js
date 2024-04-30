import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { createBlogPost } from '../services/blog'

const CreateBlog = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createBlogPost,
    onSuccess: () => {
      queryClient.invalidateQueries('posts')
      setTitle('')
      setAuthor('')
    },
  })

  const handleCreate = (e) => {
    e.preventDefault()
    mutation.mutate({ title, author })
  }
  return (
    <div>
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

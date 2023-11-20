import { useState } from 'react'
import blogService from '../services/blogs'

const CreateBlog = ({ setShowNotification, setNotification, addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const handleCreate = async (event) => {
    event.preventDefault()
    const blog = await blogService.create({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
    addBlog(blog)
    setNotification({
      message: `a new blog ${blog.title} by ${blog.author} added`,
      isError: false,
    })
    setShowNotification(true)
    setTimeout(() => {
      setShowNotification(false)
    }, 5000)
  }
  return (
    <>
      <form onSubmit={handleCreate}>
        <div>
          Title:
          <input
            type="text"
            name="title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value)
            }}
          />
          <br />
          Author:
          <input
            type="text"
            name="title"
            value={author}
            onChange={(event) => {
              setAuthor(event.target.value)
            }}
          />
          <br />
          Url:
          <input
            type="text"
            name="title"
            value={url}
            onChange={(event) => {
              setUrl(event.target.value)
            }}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </>
  )
}
export default CreateBlog

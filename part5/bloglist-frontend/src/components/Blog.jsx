import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const [showView, setshowView] = useState(false)
  const handleShow = () => {
    setshowView(!showView)
  }

  const handleRemove = async () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      try {
        console.log('blog', blog)
        await blogService.remove(blog.id)
        removeBlog(blog.id)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div style={blogStyle}>
      {blog.title}{' '}
      <button onClick={handleShow}>{showView ? 'hide' : 'view'}</button>
      <br />
      {showView ? (
        <div>
          {' '}
          {blog.url} <br />
          {blog.likes} <button>like</button>
          <br />
          {blog.user.username} <br />
          <button onClick={handleRemove}>remove</button>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}
export default Blog

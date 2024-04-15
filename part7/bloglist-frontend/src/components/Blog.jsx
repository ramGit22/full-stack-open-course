import { useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../features/blogSlice'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  const handleLike = (blog) => {
    console.log('blog', blog)

    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    dispatch(likeBlog({ id: blog.id, updatedBlogData: updatedBlog }))
  }

  const handleDelete = (blog) => {
    dispatch(deleteBlog({ id: blog.id }))
  }
  return (
    <div>
      {`${blog.title} has ${blog.likes} likes. Author: ${blog.author} `}
      <span>
        <button onClick={() => handleLike(blog)}>Like</button>
        <button onClick={() => handleDelete(blog)}>Delete</button>
      </span>
    </div>
  )
}

export default Blog

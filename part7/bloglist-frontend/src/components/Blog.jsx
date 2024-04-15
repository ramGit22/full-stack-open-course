import { useDispatch } from 'react-redux'
import { likeBlog } from '../features/blogSlice'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  const handleLike = (blog) => {
    console.log('blog', blog)

    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    dispatch(likeBlog({ id: blog.id, updatedBlogData: updatedBlog }))
  }
  return (
    <div>
      {blog.title} {blog.author}{' '}
      <span>
        <button onClick={() => handleLike(blog)}>Like</button>
        <button>Delete</button>
      </span>
    </div>
  )
}

export default Blog

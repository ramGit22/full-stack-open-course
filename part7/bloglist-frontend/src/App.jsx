import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from './features/userSlice'
import { createBlogs, fetchBlogs } from './features/blogSlice'
import { createNotification } from './features/notificationSlice'
import Notification from './components/Notification'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)
  const { blogs } = useSelector((state) => state.blogs)

  useEffect(() => {
    if (user) {
      dispatch(fetchBlogs())
    }
  }, [user, dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(loginUser({ username, password }))
  }

  const handleCreate = (event) => {
    event.preventDefault()
    dispatch(createBlogs({ title, author, url }))
    dispatch(createNotification(title))
  }

  return (
    <div>
      {!user ? (
        <div>
          <h2>Login to view blogs</h2>
          <form onSubmit={handleLogin}>
            <div>
              Username:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      ) : (
        <div>
          <Notification />
          <h2>Blogs</h2>
          <form onSubmit={handleCreate}>
            Title:
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
            Author:
            <input value={author} onChange={(e) => setAuthor(e.target.value)} />
            Url:
            <input value={url} onChange={(e) => setUrl(e.target.value)} />
            <button type="submit">Create</button>
          </form>
          <div style={{ margin: '10px' }}>
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default App

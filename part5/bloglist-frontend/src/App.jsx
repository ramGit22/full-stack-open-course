import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import CreateBlog from './components/CreateBlog'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [createBlog, setcreateBlog] = useState(false)

  const [notification, setNotification] = useState({
    message: '',
    isError: false,
  })
  const [showNotification, setShowNotification] = useState(false)

  useEffect(() => {
    if (user) {
      blogService.getAll().then((blogs) => setBlogs(blogs))
    }
  }, [user])

  useEffect(() => {
    const storedUser = window.localStorage.getItem('loggedUser')
    if (storedUser) {
      const user = JSON.parse(storedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (newBlog) => {
    setBlogs((prevBlogs) => [...prevBlogs, newBlog])
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)

      setUsername('')
      setPassword('')
    } catch (error) {
      console.log(error)
      setNotification({
        message: 'wrong username or password',
        isError: true,
      })
      setShowNotification(true)
      setTimeout(() => {
        setShowNotification(false)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    setShowNotification(false)
  }

  const handleCreate = () => {
    setcreateBlog(true)
    setShowNotification(false)
  }

  const handleCancel = () => {
    setcreateBlog(false)
    setShowNotification(false)
  }

  if (user === null) {
    return (
      <div>
        {showNotification && (
          <Notification
            message={notification.message}
            isError={notification.isError}
          />
        )}
        <h2>Log in to application</h2>
        <form onSubmit={handleSubmit}>
          <div>
            Username:
            <input
              type="text"
              value={username}
              name="Username"
              onChange={(event) => {
                setUsername(event.target.value)
              }}
            />
          </div>
          <div>
            password:
            <input
              type="password"
              value={password}
              name="password"
              onChange={(event) => {
                setPassword(event.target.value)
              }}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  } else {
    return (
      <div>
        {showNotification && (
          <Notification
            message={notification.message}
            isError={notification.isError}
          />
        )}

        <h2>Blogs</h2>
        <p>{user.username} logged in</p>
        <button onClick={handleLogout}>Log Out</button>
        <br />
        {createBlog ? (
          <div>
            <CreateBlog
              setShowNotification={setShowNotification}
              setNotification={setNotification}
              addBlog={addBlog}
            />
            <button onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <button onClick={handleCreate}>New blog</button>
        )}
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    )
  }
}

export default App

import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from './features/userSlice'
import { createBlogs, fetchBlogs } from './features/blogSlice'
// import blogService from './services/blogs'
// import loginService from './services/login'

const App = () => {
  // const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  // const [user, setUser] = useState(null)

  // useEffect(() => {
  //   if (user) {
  //     blogService.getAll().then((blogs) => setBlogs(blogs))
  //   }
  // }, [user])

  // const handleSubmit = async (event) => {
  //   event.preventDefault()
  //   const user = await loginService.login({ username, password })
  //   console.log('user', user)
  //   window.localStorage.setItem('loogedUser', JSON.stringify(user))
  //   blogService.setToken(user.token)
  //   setUser(user)
  // }

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
                type="password" // Use type="password" for security
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      ) : (
        <div>
          <h2>Blogs</h2>
          <form onSubmit={handleCreate}>
            Title:
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
            Author:
            <input value={author} onChange={(e) => setAuthor(e.target.value)} />
            Url:
            <input value={url} onChange={(e) => setUrl(e.target.value)} />
            <button>Login</button>
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

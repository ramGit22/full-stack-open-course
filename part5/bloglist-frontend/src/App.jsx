import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    if (user) {
      blogService.getAll().then((blogs) => setBlogs(blogs))
    }
  }, [user, blogs])

  useEffect(() => {
    const storedUser = window.localStorage.getItem('loggedUser')
    if (storedUser) {
      const user = JSON.parse(storedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

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
    }
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    const blog = await blogService.create({ title, author, url })
    setTitle('')

    blogs.push(blog)
    setAuthor('')
    setUrl('')
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  if (user === null) {
    return (
      <div>
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
        <h2>Blogs</h2>
        <p>{user.username} logged in</p>
        <button onClick={handleLogout}>Log Out</button>
        <form onSubmit={handleCreate}>
          <div>
            Title:
            <input
              type="text"
              name="title"
              onChange={(event) => {
                setTitle(event.target.value)
              }}
            />
            <br />
            Author:
            <input
              type="text"
              name="title"
              onChange={(event) => {
                setAuthor(event.target.value)
              }}
            />
            <br />
            Url:
            <input
              type="text"
              name="title"
              onChange={(event) => {
                setUrl(event.target.value)
              }}
            />
          </div>
          <button type="submit">Create</button>
        </form>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    )
  }
}

export default App

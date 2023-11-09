const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlog = [
  { title: 'terve', author: 'Harry', url: 'harry.com', likes: 43 },
  {
    title: 'hello',
    author: 'testy',
    url: 'testy.com',
    likes: 50,
  },
]

const initialUser = [
  {
    username: 'ramesh',
    name: 'ramesh karki',
    passwordHash: 'abcdefghijklmnop',
  },
  {
    username: 'anamika',
    name: 'anamika parajuli',
    passwordHash: 'bgddeejhklsjafjlksdjfljdsl',
  },
]

const userInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}
const blogInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => {
    return blog.toJSON()
  })
}

module.exports = { initialBlog, initialUser, userInDb, blogInDb }

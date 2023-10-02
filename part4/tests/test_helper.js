const Blog = require('../models/blog')

const initialBlog = [
  { title: 'terve', author: 'Harry', url: 'harry.com', likes: 43 },
  {
    title: 'hello',
    author: 'testy',
    url: 'testy.com',
    likes: 50,
  },
]
const blogInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => {
    return blog.toJSON()
  })
}

module.exports = { initialBlog, blogInDb }

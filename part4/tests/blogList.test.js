const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  let newBlog = new Blog(helper.initialBlog[0])
  await newBlog.save()
  newBlog = new Blog(helper.initialBlog[1])
  await newBlog.save()
})

describe('blogList', () => {
  test('should return blogs as json', async () => {
    const response = await api.get('/api/blogs')
    expect(response.status).toBe(200)
    expect(response.type).toBe('application/json')
    expect(response.body).toHaveLength(response.body.length)
    console.log('node', process.env.NODE_ENV)
  })

  test('should return blog posts unique identifier property as Id', async () => {
    const response = await api.get('/api/blogs')
    const responseArray = response.body
    responseArray.map((blog) => {
      expect(blog.id).toBeDefined()
      expect(blog._id).toBeUndefined()
    })
  })
})

test.only('should add a new blog post', async () => {
  const newBlog = {
    title: 'subject',
    author: 'Ramesh',
    url: 'url',
    likes: 4,
  }

  await api.post('/api/blogs').send(newBlog)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlog.length + 1)
  const title = response.body.map((blog) => {
    return blog.title
  })
  expect(title).toContain('subject')
})

afterAll(async () => {
  await mongoose.connection.close()
})

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

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

afterAll(async () => {
  await mongoose.connection.close()
})

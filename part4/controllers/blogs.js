const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({}).populate('user', 'username name')
    response.json(blogs)
  } catch (error) {
    response.status(500).send({ error: 'Internal server error' })
  }
})

blogRouter.post('/', async (request, response) => {
  const body = request.body
  const user = await User.findOne()
  if (!user) {
    return response.status(400).send({ error: 'No user found in the database' })
  }
  if (!body.title || !body.url) {
    return response.status(400).send({ error: 'title or url missing' })
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.json(savedBlog)
})

blogRouter.put('/:id', async (req, res) => {
  const body = req.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
      new: true,
    })
    if (!updatedBlog) {
      return res.status(404).send({ error: 'Blog not found' })
    }
    res.json(updatedBlog)
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' })
  }
})

blogRouter.delete('/:id', async (req, res) => {
  const id = req.params.id
  try {
    const result = await Blog.findByIdAndDelete(id)
    if (result) {
      res.status(204).end()
    } else {
      res.status(404).send({ error: 'Blog not found' })
    }
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' })
  }
})
module.exports = blogRouter

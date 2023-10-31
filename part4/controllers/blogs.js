const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
require('dotenv').config()

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
  if (!request.token) {
    return response.status(401).json({ error: 'token missing' })
  }
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)
    if (!user) {
      return response
        .status(400)
        .send({ error: 'No user found in the database' })
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
  } catch (error) {
    return response.status(401).json({ error: 'token invalid' })
  }
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
  if (!req.token) {
    return res.status(401).json({ error: 'token missing' })
  }
  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(id)
    if (!blog) {
      return res.status(400).send({ error: 'No blog found in the database' })
    }
    if (blog.user.toString() !== user.id.toString()) {
      return res
        .status(401)
        .json({ error: 'only the creator can delete blogs' })
    }
    await Blog.findByIdAndDelete(id)
    res.status(204).end()
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' })
  }
})
module.exports = blogRouter

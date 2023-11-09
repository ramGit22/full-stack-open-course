const blogRouter = require('express').Router()
const Blog = require('../models/blog')
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
  const user = request.user
  if (!user) {
    return response.status(401).json({ error: 'user missing or token invalid' })
  }
  try {
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
  const user = req.user
  if (!user) {
    return res.status(401).json({ error: 'user missing or token invalid' })
  }
  try {
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

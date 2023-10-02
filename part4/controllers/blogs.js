const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

blogRouter.post('/', (request, response) => {
  const body = request.body
  if (!body.title || !body.url) {
    return response.status(400).send({ error: 'title or url missing' })
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  })

  blog
    .save()
    .then((result) => {
      response.status(201).json(result)
    })

    .catch((error) => {
      response.status(400).send({ error: error.message })
    })
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

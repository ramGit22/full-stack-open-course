const config = require('./utils/config')
const blogRouter = require('./controllers/blogs')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const usersRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

const mongoUrl = config.MONGODB_URI
mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDb:', error.message)
  })

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  } else {
    request.token = null
  }
  next()
}

const userExtractor = async (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer')) {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (decodedToken.id) {
      const user = await User.findById(decodedToken.id)
      if (user) {
        request.user = user
      } else {
        return response.status(400).json({ error: 'No user found' })
      }
    } else {
      return response.status(401).json({ error: 'token invalid' })
    }
  } else {
    return response.status(401).json({ error: 'token missing' })
  }
  next()
}

app.use(cors())
app.use(express.json())
app.use('/api/login', loginRouter)

app.use(tokenExtractor)
app.use(userExtractor)
app.use('/api/users', usersRouter)
app.use('/api/blogs', blogRouter)

module.exports = app

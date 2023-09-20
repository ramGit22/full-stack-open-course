const config = require('./utils/config')
const blogRouter = require('./controllers/blogs')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const mongoUrl = config.MONGODB_URI
mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDb:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

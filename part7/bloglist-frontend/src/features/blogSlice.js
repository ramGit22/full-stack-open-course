import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = {
  blogs: [],
}

export const fetchBlogs = createAsyncThunk(
  'blogs/fetchBlogs',
  async (_, { getState }) => {
    const { user } = getState().user
    if (user) {
      blogService.setToken(user.token)
      const blogs = await blogService.getAll()
      console.log('fetchedBlogs', blogs)
      return blogs
    }
  }
)

export const createBlogs = createAsyncThunk(
  'blogs/createBlogs',
  async (blogData, { getState }) => {
    const { user } = getState().user
    if (user) {
      blogService.setToken(user.token)
      const blogs = await blogService.create(blogData)
      console.log('blogs', blogs)
      return blogs
    }
  }
)

export const likeBlog = createAsyncThunk(
  'blogs/likeBlog',
  async ({ id, updatedBlogData }, { getState }) => {
    const { user } = getState().user
    if (user) {
      blogService.setToken(user.token)
      const updatedBlog = await blogService.likeUpdate(id, updatedBlogData)
      console.log('updatelike', updatedBlog)
      return updatedBlog
    }
  }
)

export const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBlogs.fulfilled, (state, action) => {
      state.blogs = action.payload
    })
    builder.addCase(createBlogs.fulfilled, (state, action) => {
      state.blogs = [...state.blogs, action.payload]
    })
    builder.addCase(likeBlog.fulfilled, (state, action) => {
      const index = state.blogs.findIndex(
        (blog) => blog.id === action.payload.id
      )
      if (index !== -1) {
        state.blogs[index] = action.payload
      }
    })
  },
})

export default blogSlice.reducer

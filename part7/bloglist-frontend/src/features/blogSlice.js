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
  },
})

export default blogSlice.reducer

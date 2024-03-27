import { configureStore } from '@reduxjs/toolkit'
import useReducer from './features/userSlice'
import blogReducer from './features/blogSlice'

export const store = configureStore({
  reducer: {
    user: useReducer,
    blogs: blogReducer,
  },
})

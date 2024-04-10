import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/userSlice'
import blogReducer from './features/blogSlice'
import notificationReducer from './features/notificationSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    blogs: blogReducer,
    notification: notificationReducer,
  },
})

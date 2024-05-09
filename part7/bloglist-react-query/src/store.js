import { configureStore } from '@reduxjs/toolkit'
import notificationsReducer from './features/notificationSlice'

export const store = configureStore({
  reducer: {
    notifications: notificationsReducer,
  },
})

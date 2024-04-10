import { createSlice } from '@reduxjs/toolkit'

const initialState = { notification: [] }

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    createNotification(state, action) {
      return {
        ...state,
        notification: [...state.notification, action.payload],
      }
    },

    clearNotification(state) {
      state.notification = []
    },
  },
})

export const { createNotification, clearNotification } =
  notificationSlice.actions
export default notificationSlice.reducer

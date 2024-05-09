import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  notifications: [],
}

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification(state, action) {
      state.notifications.push(action.payload)
    },
    removeNotification(state, action) {
      state.notifications = []
    },
  },
})

export const { addNotification, removeNotification } =
  notificationsSlice.actions
export default notificationsSlice.reducer

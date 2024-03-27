import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import loginService from '../services/login'

const initialState = {
  user: null,
}

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ username, password }) => {
    const user = await loginService.login({ username, password })
    return user
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser(state) {
      state.user = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload
    })
  },
})

export const { logoutUser } = userSlice.actions

export default userSlice.reducer

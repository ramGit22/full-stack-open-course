import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

// const getId = () => (100000 * Math.random()).toFixed(0)

const initialState = {
  anecdotes: [],
  selected: '',
  notification: '',
}

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    voteForAnecdote: (state, action) => {
      const id = action.payload.id
      const anecdoteToChange = state.anecdotes.find((a) => a.id === id)
      if (anecdoteToChange) {
        anecdoteToChange.votes += 1
      }
    },

    filterAnecdotes: (state, action) => {
      state.selected = action.payload
    },

    setNotification: (state, action) => {
      state.notification = action.payload
    },

    clearNotification: (state) => {
      state.notification = ''
    },
    setAnecdotes(state, action) {
      state.anecdotes = Array.isArray(action.payload) ? action.payload : []
    },

    createAnecdote: (state, action) => {
      state.anecdotes.push(action.payload)
    },
  },
})

export const {
  voteForAnecdote,
  addAnecdote,
  filterAnecdotes,
  setNotification,
  clearNotification,
  setAnecdotes,
  createAnecdote,
} = anecdotesSlice.actions

export const initializeAncedotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addVotes = (id) => {
  return async (dispatch) => {
    const newVote = await anecdoteService.updateVote(id)
    dispatch(voteForAnecdote(newVote))
  }
}
export default anecdotesSlice.reducer

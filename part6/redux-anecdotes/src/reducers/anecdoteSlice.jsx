import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}

const initialState = {
  anecdotes: anecdotesAtStart.map(asObject),
  selected: '',
  notification: '',
}

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    voteForAnecdote: (state, action) => {
      const id = action.payload
      const anecdoteToChange = state.anecdotes.find((a) => a.id === id)
      if (anecdoteToChange) {
        anecdoteToChange.votes += 1
      }
    },
    addAnecdote: (state, action) => {
      const newAnecdote = {
        content: action.payload.content,
        id: getId(),
        votes: 0,
      }
      state.anecdotes.push(newAnecdote)
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
  },
})

export const {
  voteForAnecdote,
  addAnecdote,
  filterAnecdotes,
  setNotification,
  clearNotification,
} = anecdotesSlice.actions
export default anecdotesSlice.reducer

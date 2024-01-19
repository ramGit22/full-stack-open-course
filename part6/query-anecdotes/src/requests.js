import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

export const createAnecdote = async ({ anecdoteContent }) => {
  const newAnecdote = {
    content: anecdoteContent,
    votes: 0,
  }
  const res = await axios.post(baseUrl, newAnecdote)
  return res.data
}

export const updateVote = async (selectedAnecdote) => {
  const res = await axios.put(
    `${baseUrl}/${selectedAnecdote.id}`,
    selectedAnecdote
  )
  return res.data
}

import { useSelector, useDispatch } from 'react-redux'
import {
  addVotes,
  setNotification,
  clearNotification,
} from '../reducers/anecdoteSlice'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes.anecdotes)
  console.log('anecdotes', anecdotes)
  const dispatch = useDispatch()
  const selectedItem = useSelector((state) => state.anecdotes.selected)

  const vote = (id) => {
    const votedAnecdote = anecdotes.find((anecdote) => anecdote.id === id)
    dispatch(addVotes(id))
    dispatch(setNotification(`You voted for '${votedAnecdote.content}'`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  const filteredAndSortedAnecdotes = anecdotes
    .filter((anecdote) =>
      anecdote.content
        ? anecdote.content.toLowerCase().includes(selectedItem.toLowerCase())
        : false
    )
    .sort((a, b) => b.votes - a.votes)

  return (
    <div>
      <h2>Anecdotes</h2>
      {filteredAndSortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList

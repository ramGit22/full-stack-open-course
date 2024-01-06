import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteSlice'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes.anecdotes)
  console.log('anecdotes', anecdotes)
  const dispatch = useDispatch()
  const selectedItem = useSelector((state) => state.anecdotes.selected)

  const vote = (id) => {
    dispatch(voteForAnecdote(id))
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

import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../actions/anecdoteActions'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes)
  console.log('anecdotes', anecdotes)
  const dispatch = useDispatch()
  const filter = useSelector((state) => state.filter)

  const vote = (id) => {
    dispatch(voteForAnecdote(id))
  }

  const filteredAndSortedAnecdotes = anecdotes
    .filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
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

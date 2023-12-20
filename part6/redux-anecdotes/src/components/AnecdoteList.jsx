import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../actions/anecdoteActions'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state)
  console.log('anecdotes', anecdotes)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteForAnecdote(id))
  }
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
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

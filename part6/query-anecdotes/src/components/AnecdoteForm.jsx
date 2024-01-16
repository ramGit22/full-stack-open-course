import { useState } from 'react'
import PropTypes from 'prop-types'

const AnecdoteForm = ({ onSubmit }) => {
  const [anecdote, setAnecdote] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(anecdote)
    setAnecdote('')
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="anecdote"
          value={anecdote}
          onChange={(e) => setAnecdote(e.target.value)}
        />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

AnecdoteForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default AnecdoteForm

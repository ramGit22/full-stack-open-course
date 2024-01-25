import { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import NotificationContext from '../contexts/notificationContext'

const AnecdoteForm = ({ onSubmit }) => {
  const [anecdote, setAnecdote] = useState('')
  const { dispatchNotification } = useContext(NotificationContext)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (anecdote.length < 5) {
      dispatchNotification({
        type: 'SHOW_NOTIFICATION',
        message: 'Anecdote must be at least 5 characters long',
      })
      return
    }
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

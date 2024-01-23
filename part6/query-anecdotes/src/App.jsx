import axios from 'axios'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { createAnecdote, getAnecdotes, updateVote } from './requests'
import notificationReducer from './notificationReducer'
import { useReducer } from 'react'

const App = () => {
  const queryClient = useQueryClient()
  const [notificationState, dispatchNotification] = useReducer(
    notificationReducer,
    { message: '', visible: false }
  )

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const updatevoteMutation = useMutation({
    mutationFn: updateVote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const handleVote = async (anecdote) => {
    updatevoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    dispatchNotification({
      type: 'SHOW_NOTIFICATION',
      message: 'Vote registered',
    })

    setTimeout(() => {
      dispatchNotification({ type: 'HIDE_NOTIFICATION' })
    }, 5000)
  }

  const handleCreate = (anecdoteContent) => {
    newAnecdoteMutation.mutate({ anecdoteContent })
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
  })
  console.log('result', result)

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <span>Error: {result.error.message}</span>
  }
  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification
        message={notificationState.message}
        visible={notificationState.visible}
      />
      <AnecdoteForm onSubmit={handleCreate} />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App

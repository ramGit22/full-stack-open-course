import { useDispatch } from 'react-redux'
import { filterAnecdotes } from '../actions/anecdoteActions'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const payload = event.target.value
    console.log('payload', payload)
    dispatch(filterAnecdotes(payload))
  }

  return (
    <div style={{ marginBottom: 10 }}>
      filter <input name="anecfilter" onChange={handleChange}></input>
    </div>
  )
}

export default Filter

import { useDispatch } from 'react-redux'
import { filterAnecdotes } from '../reducers/anecdoteSlice'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const filterValue = event.target.value
    dispatch(filterAnecdotes(filterValue))
  }

  return (
    <div style={{ marginBottom: 10 }}>
      filter <input name="anecfilter" onChange={handleChange}></input>
    </div>
  )
}

export default Filter

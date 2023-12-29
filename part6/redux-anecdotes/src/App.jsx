import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
const App = () => {
  return (
    <>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </>
  )
}

export default App

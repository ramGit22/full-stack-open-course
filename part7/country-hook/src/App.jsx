import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState({ found: null }) // Initializes with an object for consistency

  useEffect(() => {
    if (name) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
        .then((response) => {
          setCountry({ found: true, data: response.data })
        })
        .catch((error) => {
          console.error(error) // More specific error handling
          setCountry({ found: false })
        })
    } else {
      setCountry({ found: null }) // Resets country state when input is cleared
    }
  }, [name])

  return country
}

const Country = ({ country }) => {
  if (!country || !country.found || !country.data) {
    return <div>Not found...</div>
  }

  const { name, capital, population, flags } = country.data

  return (
    <div>
      <h3>{name.common} </h3> <div>Capital: {capital[0]}</div>{' '}
      <div>Population: {population}</div>
      <img src={flags.png} height="100" alt={`Flag of ${name.common}`} />
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button type="submit">Find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App

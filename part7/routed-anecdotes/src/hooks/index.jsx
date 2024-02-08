import { useState } from 'react'

function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue)

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    value,
    onChange: handleChange,
    reset,
  }
}

export default useFormInput

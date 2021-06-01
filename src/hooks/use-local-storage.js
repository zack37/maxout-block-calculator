import { useState, useEffect } from 'react'

export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState()

  useEffect(() => {
    const item = localStorage.getItem(key)

    const toSave = item ? JSON.parse(item) : initialValue
    setValue(toSave)
  }, [])

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue]
}

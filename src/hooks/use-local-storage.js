import { useCallback, useEffect, useState } from 'react'

const isFunction = (f) => typeof f === 'function'

export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState()

  const setValue = useCallback(
    (value) => {
      try {
        const valueToStore = isFunction(value) ? value(storedValue) : value
        setStoredValue(valueToStore)
        localStorage.setItem(key, JSON.stringify(valueToStore))
      } catch (error) {
        console.error(error)
      }
    },
    [key, storedValue],
  )

  useEffect(() => {
    const item = localStorage.getItem(key)

    const toSave = item ? JSON.parse(item) : initialValue
    setValue(toSave)
  }, [initialValue, setValue, key])

  return [storedValue, setValue]
}

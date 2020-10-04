// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import React, {useEffect, useRef, useState} from 'react'

const parser = v => {
  try {
    return JSON.parse(v)
  } catch (e) {
    return v
  }
}

const formatter = v => (typeof v === 'object' ? JSON.stringify(v) : v)

function useLocalStorageState(
  key,
  initialValue,
  {format = formatter, parse = parser} = {},
) {
  const prevKey = useRef(key)

  const [value, setValue] = useState(
    () => parse(window.localStorage.getItem(key)) || initialValue,
  )

  useEffect(() => {
    if (prevKey.current !== key) {
      localStorage.removeItem(prevKey.current)
      prevKey.current = key
    }
    window.localStorage.setItem(key, format(value))
  }, [format, key, value])

  return [value, setValue]
}

export function SimpleGreeting({initialvalue = ''}) {
  const [name, setName] = useLocalStorageState('name', initialvalue)

  function updateName(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={updateName} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

export function ComplexGreeting({initialvalue = {name: '', age: 21}}) {
  const [data, setData] = useLocalStorageState('data', initialvalue)

  function updateName(event) {
    setData({...data, name: event.target.value})
  }

  function updateAge(event) {
    setData({...data, age: event.target.value})
  }

  return (
    <div>
      <form>
        <p>
          <label htmlFor="name">Name: </label>
          <input value={data.name} onChange={updateName} id="name" />
        </p>
        <p>
          <label htmlFor="age">Age: </label>
          <input value={data.age} onChange={updateAge} id="age" type="number" />
        </p>
      </form>
      {data.name ? <strong>Hello {data.name}</strong> : 'Please type your name'}
    </div>
  )
}

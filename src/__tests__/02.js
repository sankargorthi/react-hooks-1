import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
// import App from '../final/02'
import {ComplexGreeting, SimpleGreeting} from '../exercise/02'

afterEach(() => {
  window.localStorage.removeItem('name')
})

test('App works', () => {
  window.localStorage.setItem('name', 'jill')
  render(<SimpleGreeting />)
  screen.getByText(/hello.*jill/i)
  userEvent.clear(screen.getByRole('textbox', {name: /name/i}))
  userEvent.type(screen.getByRole('textbox', {name: /name/i}), 'bob')
  screen.getByText(/hello.*bob/i)
  expect(window.localStorage.getItem('name')).toBe('bob')
})

test('App uses localstorage instead of prop', () => {
  window.localStorage.setItem('data', JSON.stringify({name: 'bim', age: 44}))
  render(<ComplexGreeting />)
  screen.getByText(/hello.*bim/i)
})

import React, { useState } from 'react'
import { Button } from '../../components/Button'
export default function AddSantas() {
  const [santa, setSanta] = useState('')
  const [email, setEmail] = useState('')
  const [isAssigned, setisAssigned] = useState(false)
  const [elfo, setElfo] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (santa && email) {
      try {
        let response = await fetch('http://localhost:3000/api/addSanta', {
          method: 'POST',
          body: JSON.stringify({
            santa,
            email,
            isAssigned: false,
            elfo,
          }),
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
          },
        })
        response = await response.json()
        setSanta('')
        setEmail('')
        setElfo('')
        setError('')
        setMessage('Santa agregado con exito a la db')
      } catch (errorMessage) {
        setError(errorMessage)
      }
    } else {
      return setError('All fields are required')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      {error ? <div className="alert-error">{error}</div> : null}
      {message ? <div className="alert-message">{message}</div> : null}
      <div>
        <label htmlFor="first-name" className="lead">
          Nombre
        </label>
        <input
          type="text"
          placeholder="Nombre del Santa"
          onChange={(e) => setSanta(e.target.value)}
          value={santa}
          className="block w-full px-2 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="comment" className="lead">
          Email
        </label>
        <div className="mt-1">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      <div className="form-group">
        <Button type="submit" className="mt-2">
          Agregar Santa
        </Button>
      </div>
    </form>
  )
}

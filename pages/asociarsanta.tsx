// asociarsanta.tsx

import clientPromise from '../lib/mongodb'
import React, { useState } from 'react'
import { Button } from '../components/Button'
import { XCircleIcon, CheckCircleIcon } from '@heroicons/react/20/solid'

export default function Santas({ santas }) {
  const [selectedSanta, setselectedSanta] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (selectedSanta) {
      try {
        let response = await fetch('http://localhost:3000/api/select-santa', {
          method: 'POST',
          body: JSON.stringify({
            selectedSanta,
          }),
          headers: {
            Accept: 'application/json, text/plain, /',
            'Content-Type': 'application/json',
          },
        })
        response = await response.json()
        setselectedSanta('')
        setError('')
        setMessage('🎅 Santa con 🧝 Elfo ')
      } catch (errorMessage: any) {
        setError(errorMessage)
      }
    } else {
      return setError('🎅 Santa no seleccionado')
    }
  }
  return (
    <div>
      <h1>Asociar Santas</h1>
      <form onSubmit={handleSubmit} className="form">
        {error ? (
          <div className="mb-3 border-l-4 border-red-400 bg-red-50 p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <XCircleIcon
                  className="h-5 w-5 text-red-400"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-3">
                <p className="m-0 p-0 text-sm text-red-800">{error}</p>
              </div>
            </div>
          </div>
        ) : null}
        {message ? (
          <div className="mb-3 border-l-4 border-emerald-400 bg-emerald-50 p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircleIcon
                  className="h-5 w-5 text-emerald-400"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-3">
                <p className="m-0 p-0 text-sm text-emerald-800">{message}</p>
              </div>
            </div>
          </div>
        ) : null}
        <label htmlFor="country" className="lead block text-sm font-medium">
          Seleccione su nombre
        </label>
        <select
          name="selectedSanta"
          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          onChange={(e) => setselectedSanta(e.target.value)}
        >
          <option>Seleccione un santa</option>
          {santas.map((santa) => (
            <option key={santa._id} value={santa.santa}>
              {santa.santa}
            </option>
          ))}
        </select>
        <Button type="submit" className="mt-2">
          Asignar Elfo
        </Button>
      </form>
    </div>
  )
}

export async function getServerSideProps() {
  try {
    const client = await clientPromise
    const db = client.db('secretsanta')
    const santas = await db.collection('santas').find({}).toArray()

    return {
      props: {
        santas: JSON.parse(
          JSON.stringify(
            // asociarsanta.tsx (continuación)

            santas
          )
        ),
      },
    }
  } catch (error) {
    console.log(error)
  }
}

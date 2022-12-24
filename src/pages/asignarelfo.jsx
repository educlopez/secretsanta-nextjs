import clientPromise from '../lib/mongodb'
import React, { useState } from 'react'
import { Button } from '../components/Button'
import { XCircleIcon, CheckCircleIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import elfProfile from '@/images/elf.png'

export default function Santas({ santas }) {
  const [selectedSanta, setselectedSanta] = useState('')
  const [selectedElf, setselectedElf] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
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
        setselectedElf(response.selectedElf)
        setError('')
        setMessage('🧝 Elfo asignado a 🎅 Santa con éxito')
      } catch (errorMessage) {
        setError(errorMessage)
      }
    } else {
      return setError('🎅 Santa no seleccionado')
    }
  }
  return (
    <>
      <h1>Asignar Elfo</h1>
      <form onSubmit={handleSubmit} className="form">
        {error ? (
          <div className="mb-3 inline-flex justify-center gap-0.5 overflow-hidden  border-l-4 border-red-300 bg-zinc-900 p-4 py-1 px-3 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-red-400/10 dark:text-red-400 dark:ring-1 dark:ring-inset dark:ring-red-400/20 dark:hover:bg-red-400/10 dark:hover:text-red-300 dark:hover:ring-red-300">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <XCircleIcon className="w-5 h-5 " aria-hidden="true" />
              </div>
              <div className="ml-3">
                <p className="p-0 m-0 text-sm">{error}</p>
              </div>
            </div>
          </div>
        ) : null}
        {message ? (
          <div className="mb-3 inline-flex justify-center gap-0.5 overflow-hidden  border-l-4 border-emerald-300 bg-zinc-900 p-4 py-1 px-3 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-emerald-400/10 dark:text-emerald-400 dark:ring-1 dark:ring-inset dark:ring-emerald-400/20 dark:hover:bg-emerald-400/10 dark:hover:text-emerald-300 dark:hover:ring-emerald-300">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircleIcon className="w-5 h-5 " aria-hidden="true" />
              </div>
              <div className="ml-3">
                <p className="p-0 m-0 text-sm">{message}</p>
              </div>
            </div>
          </div>
        ) : null}
        <label
          htmlFor="selectedSanta"
          className="block text-sm font-medium lead"
        >
          Seleccione su nombre
        </label>
        <select
          name="selectedSanta"
          className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
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

      {selectedElf && (
        <div className="mt-6">
          <h1>Elfo Asignado</h1>
          <ul
            role="list"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5"
          >
            <li className="group relative col-span-1 flex flex-col divide-y rounded-2xl bg-zinc-50/40 ring-1 ring-inset ring-zinc-900/7.5 transition-shadow hover:shadow-md hover:shadow-zinc-900/5 group-hover:ring-zinc-900/10 dark:bg-white/2.5 dark:ring-white/10 dark:hover:shadow-black/5 dark:group-hover:ring-white/20">
              <div className="flex flex-col flex-1 p-8">
                <div className="mx-auto h-24 w-24 overflow-hidden rounded-full border border-emerald-500 bg-gradient-to-r from-[#36b49f]/40 to-[#DBFF75]/40 transition-colors  duration-300  dark:group-hover:border-rose-300/70">
                  <Image
                    src={elfProfile}
                    alt="elf"
                    className="w-full h-full m-0"
                  />
                </div>
                <h3 className="mt-6 text-sm font-medium text-center lead">
                  <b>{selectedElf}</b>
                </h3>
                <p className="text-center lead">Espera un regalo bonico</p>
              </div>
            </li>
          </ul>
        </div>
      )}
    </>
  )
}

export async function getServerSideProps() {
  try {
    const client = await clientPromise
    const db = client.db('secretsanta')
    const santas = await db.collection('santas').find({}).toArray()

    return {
      props: {
        santas: JSON.parse(JSON.stringify(santas)),
      },
    }
  } catch (error) {
    console.log(error)
  }
}

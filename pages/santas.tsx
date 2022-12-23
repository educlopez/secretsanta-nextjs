import clientPromise from '../lib/mongodb'

import { Avatar } from '../components/Avatar'

export default function Santas({ santas }) {
  return (
    <div>
      <h1>Listado de Santas</h1>
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {santas.map((santa) => (
          <li
            key={santa._id}
            className="group relative col-span-1 flex flex-col divide-y rounded-2xl bg-zinc-50/40 ring-1 ring-inset ring-zinc-900/7.5 transition-shadow hover:shadow-md hover:shadow-zinc-900/5 group-hover:ring-zinc-900/10 dark:bg-white/2.5 dark:ring-white/10 dark:hover:shadow-black/5 dark:group-hover:ring-white/20"
          >
            <div className="flex flex-col flex-1 p-8">
              <Avatar />
              <h3 className="mt-6 text-sm font-medium text-center lead">
                {santa.santa}
              </h3>
              <p className="text-center lead">{santa.email}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export async function getServerSideProps() {
  try {
    const client = await clientPromise
    const db = client.db('secretsanta')

    const santas = await db.collection('santas').find({}).toArray()

    return {
      props: { santas: JSON.parse(JSON.stringify(santas)) },
    }
  } catch (e) {
    console.error(e)
  }
}

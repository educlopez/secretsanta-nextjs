import Head from 'next/head'
import clientPromise from '../lib/mongodb'

export async function getServerSideProps(context) {
  try {
    await clientPromise
    return {
      props: { isConnected: true },
    }
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false },
    }
  }
}

export default function Home({ isConnected }) {
  return (
    <div className="container">
      <Head>
        <title>Secret Santa Nextjs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Secret Santa Edu</h1>

        {isConnected ? (
          <h2 className="subtitle">
            Conexión con MongoDB:{' '}
            <span className="px-3 overflow-hidden font-medium text-white transition rounded-full bg-emerald-900 dark:bg-emerald-400/10 dark:text-emerald-400 dark:ring-1 dark:ring-inset dark:ring-emerald-400/20">
              OK
            </span>
          </h2>
        ) : (
          <h2 className="subtitle">
            You are NOT connected to MongoDB. Check the <code>README.md</code>{' '}
            for instructions.
          </h2>
        )}
      </main>
    </div>
  )
}

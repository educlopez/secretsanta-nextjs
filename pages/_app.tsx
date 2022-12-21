import { useEffect, useRef } from 'react'
import Layout from '../components/Layout'

import '../styles/tailwind.css'

function usePrevious(value) {
  let ref = useRef()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

export default function App({ Component, pageProps, router }) {
  let previousPathname = usePrevious(router.pathname)

  return (
    <Layout {...pageProps}>
      <Component {...pageProps} />
    </Layout>
  )
}

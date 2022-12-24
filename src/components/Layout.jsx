import { motion } from 'framer-motion'
import { Header } from '@/components/Header'
import { Prose } from '@/components/Prose'
import { HeroPattern } from '@/components/HeroPattern'
export function Layout({ children }) {
  return (
    <section>
      <div className="">
        <motion.header
          layoutScroll
          className="fixed inset-y-0 left-0 z-40 w-full px-6 pt-4 pb-8 overflow-y-auto contents"
        >
          <Header />
        </motion.header>
        <HeroPattern />
        <div className="relative px-8 pt-14 sm:px-6 lg:px-8">
          <main className="py-16">
            <Prose as="article">{children}</Prose>
          </main>
        </div>
      </div>
    </section>
  )
}

import Link from 'next/link'

function TopLevelNavItem({ href, children }) {
  return (
    <li className="md:hidden">
      <Link
        href={href}
        className="block py-1 text-sm transition text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
      >
        {children}
      </Link>
    </li>
  )
}

export function Navigation(props) {
  return (
    <nav {...props}>
      <ul role="list">
        <TopLevelNavItem href="/addsantas">Crear Santa</TopLevelNavItem>
        <TopLevelNavItem href="/asignarelfo">Asignar Elfo</TopLevelNavItem>
        <TopLevelNavItem href="/santas">Listado de Santas</TopLevelNavItem>
      </ul>
    </nav>
  )
}

import React from "react";
import Link from "next/link";
import { ModeToggle } from './ModeToggle'
import { Logo } from "./Logo"

export default function Header(props: any) {
    return (
        <div className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between gap-12 px-4 transition sm:px-6 lg:z-30 lg:px-8 backdrop-blur-sm dark:backdrop-blur bg-white/10 dark:bg-zinc-900/10">
            <div className="absolute inset-x-0 top-full h-px transition bg-zinc-900/7.5 dark:bg-white/7.5"></div>
            <div className="flex items-center gap-5">
                <Logo className="h-6" />
                <nav className="hidden md:block">
                    <ul role="list" className="flex items-center gap-8">
                        <li>
                            <Link className="text-sm leading-5 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white" href="/">
                                Home
                            </Link>
                        </li>
                          <li>
                            <Link className="text-sm leading-5 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white" href="/addsantas">
                                Crear Santa
                            </Link>
                        </li>
                         <li>
                            <Link className="text-sm leading-5 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white" href="/santas">
                                Consultar Santas
                            </Link>
                        </li>
                         <li>
                            <Link className="text-sm leading-5 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white" href="/asociarsanta">
                                Asociar Santa
                            </Link>
                        </li>
                        <li>
                            <Link className="text-sm leading-5 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white" href="/api/santas">
                                Api
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="hidden md:block md:h-5 md:w-px md:bg-zinc-900/10 md:dark:bg-white/15" />
                    <div className="flex gap-4">
                        <ModeToggle />
                </div>
            </div>
        </div>
    )
}
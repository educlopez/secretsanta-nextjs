import React from 'react';
import Link from 'next/link'

import { Prose } from './Prose';
import Header  from './Header';
import { HeroPattern } from './HeroPattern';

export default function Layout(props: any) {
    return (
        <div className="lg:ml-72 xl:ml-80 lg:mr-72 xl:mr-80">
            <Header/>
            <HeroPattern/>
            <div className="relative px-4 pt-14 sm:px-6 lg:px-8">
                <main className="py-16">
                    <Prose as="article">{props.children}</Prose>
                </main>
            </div>
        </div>
    )
}
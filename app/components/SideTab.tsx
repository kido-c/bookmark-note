'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useSession, signOut } from 'next-auth/react'

import kanbanIcon from '@/app/assets/icons/kanban.png'
import folderIcon from '@/app/assets/icons/folder.png'

const HEADER_LIST = [
  {
    herf: '/',
    title: 'Go to Main',
    activeIcon: folderIcon,
    alt: 'main',
  },
  {
    herf: '/bookmarks',
    title: 'Bookmarks',
    activeIcon: kanbanIcon,
    alt: 'kanban',
  },
]

export default function SideTab() {
  const { data: session } = useSession()

  return (
    <div className="h-full fixed bg-white">
      <div className="w-44 h-full flex-col justify-center content-center">
        {HEADER_LIST.map((header) => (
          <Link
            key={header.herf}
            href={header.herf}
            className="flex content-center justify-center mb-3"
          >
            <Image
              src={header.activeIcon}
              width={25}
              height={25}
              alt={header.alt}
            />
            <span className="ml-3">{header.title}</span>
          </Link>
        ))}
        {!!session && <button onClick={() => signOut()}>Logout</button>}
        {!session && <Link href="/auth/signin">Login</Link>}
      </div>
    </div>
  )
}

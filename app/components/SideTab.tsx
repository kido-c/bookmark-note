import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import kanbanIcon from '@/app/assets/icons/kanban.png'
import folderIcon from '@/app/assets/icons/folder.png'
import { getSession } from '@/app/lib/action'

const HEADER_LIST = [
  {
    herf: '/',
    title: '메인 페이지',
    activeIcon: folderIcon,
    alt: 'main',
  },
  {
    herf: '/bookmarks',
    title: '북마크',
    activeIcon: kanbanIcon,
    alt: 'kanban',
  },
]

export default async function SideTab() {
  const token = await getSession()

  return (
    <div className="h-full fixed bg-white">
      <div className="w-44 h-full flex-col justify-center content-center">
        {HEADER_LIST.map((header) => (
          <Link
            key={header.herf}
            href={header.herf}
            className="flex content-center mb-3 ml-8"
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
        <div className="fixed bottom-20 left-6">
          {token ? (
            <Link href={'/auth/signout'} className="flex content-center mb-3">
              <span className="flex justify-center ml-17 px-8 py-2 rounded-3xl border-active border text-main w-32">
                Logout
              </span>
            </Link>
          ) : (
            <Link
              href={'/auth/signin'}
              className="flex content-center justify-center mb-3"
            >
              <span className="flex justify-center ml-17 px-8 py-2 rounded-3xl bg-active text-white w-32">
                Login
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

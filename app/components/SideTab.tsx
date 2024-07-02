import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

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

export default function SideTab({ token }: { token?: string }) {
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
        {token ? (
          <Link
            href={'/auth/signout'}
            className="flex content-center justify-center mb-3"
          >
            <span className="ml-3">로그아웃</span>
          </Link>
        ) : (
          <Link
            href={'/auth/signin'}
            className="flex content-center justify-center mb-3"
          >
            <span className="ml-3">로그인</span>
          </Link>
        )}
      </div>
    </div>
  )
}

import React from 'react'
import { Noto_Sans_KR } from 'next/font/google'
import type { Metadata } from 'next'

import './globals.css'
import SideTab from '@/app/components/SideTab'

export const metadata: Metadata = {
  title: 'Bookmark Note',
  description: 'Bookmark Note for your favorite Bookmark',
}

const notoSansKr = Noto_Sans_KR({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={notoSansKr.className}>
      <body>
        <SideTab />
        <div className="ml-44 bg-main w-full m-2 rounded-xl border-2 border-main overflow-auto">
          {children}
        </div>
      </body>
    </html>
  )
}

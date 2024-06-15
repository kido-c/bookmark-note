import React from 'react'
import type { Metadata } from 'next'

import './globals.css'
import SideTab from '@/app/components/SideTab'

export const metadata: Metadata = {
  title: 'Bookmark Note',
  description: 'Bookmark Note for your favorite Bookmark',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <SideTab />
        <div className="ml-44 bg-main w-full">{children}</div>
      </body>
    </html>
  )
}

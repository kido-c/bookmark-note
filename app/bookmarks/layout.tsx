import React from 'react'

import Header from '@/app/bookmarks/components/Header'

export default function Bookmarkslayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="h-fit">
      <Header />
      {children}
    </div>
  )
}

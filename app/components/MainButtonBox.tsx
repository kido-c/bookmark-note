'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

import Button from '@/app/components/Button'

export default function MainButtonBox() {
  const router = useRouter()

  const moveToExtension = () => {
    window.open(
      'https://chromewebstore.google.com/detail/bookmark-note/jmaccghdoemejhfpdlgojbbglpnippkn?hl=ko&utm_source=ext_sidebar',
      '_blank'
    )
  }

  const moveToBookmark = () => {
    router.push('/bookmarks')
  }

  return (
    <div className="flex gap-5">
      <Button title="시작하기" style="border" handleClick={moveToBookmark} />
      <Button
        title="확장 프로그램 설치"
        style="active"
        handleClick={moveToExtension}
      />
    </div>
  )
}

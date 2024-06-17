import Image from 'next/image'
import React from 'react'

import folderIcon from '@/app/assets/icons/folder.png'

export default function Header() {
  return (
    <div className="mt-3 ml-6 mb-10">
      <div className="flex justify-start items-center">
        <Image src={folderIcon} width={40} height={40} alt="main" />
        <div>북마크 리스트</div>
      </div>
      <div className="pl-2">카테고리별로 분류되어있는 북마크 리스트입니다.</div>
    </div>
  )
}

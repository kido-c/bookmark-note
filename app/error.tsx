'use client'
import Image from 'next/image'

import look_penguin from '@/app/assets/images/look_penguin.png'

export default function ErrorPage() {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <Image src={look_penguin} alt="look_penguin" width={500} height={500} />

      <div className="mt-6 text-lg text-main ">
        에러가 발생하였습니다. 관리자에게 문의해주세요.
      </div>
    </div>
  )
}

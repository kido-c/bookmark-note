import Image from 'next/image'

import running_penguin from '@/app/assets/images/running_penguin.gif'

export default function LoadingPage() {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <Image
        src={running_penguin}
        width={500}
        height={500}
        alt="running penguin"
        style={{ borderRadius: '10%' }}
      />

      <div className="mt-6 text-lg text-main ">
        북마크를 가지고 오는 중 입니다..
      </div>
    </div>
  )
}

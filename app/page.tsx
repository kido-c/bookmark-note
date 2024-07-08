import Image from 'next/image'

import MainButtonBox from '@/app/components/MainButtonBox'

import landing_img from './assets/images/landing.png'

export default function Page() {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-main mt-8">Bookmark Note</h1>
      <div className="text-xl font-bold mt-4">퍼스널 북마크 관리 시스템</div>
      <div className="text-center mt-4">
        Bookmark Note는 링크뿐만 아니라 디테일한 북마크 관리를 할 수 있는
        <br />
        개인용 북마크 관리 프로그램입니다.
      </div>
      <div className="mt-20">
        <MainButtonBox />
      </div>
      <div className="w-4/5 h-96 mt-20 relative before: opacity-80 rounded-3xl">
        <Image
          src={landing_img}
          alt="bookmark"
          fill
          style={{
            objectFit: 'cover',
            borderRadius: '30px',
          }}
        />
        <div className="absolute align-text-top top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-[42px] font-bold">
          나의 북마크를 나의 노트에
        </div>
      </div>
    </div>
  )
}

/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'

import default_icon from '@/app/assets/icons/folder.png'
import default_img from '@/app/assets/images/landing.png'
// const url = 'https://tailwindcss.com/docs/border-style'
const getOGImage = async (url: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_END_POINT}/urlinfo?url=${encodeURIComponent(url)}`,
    { method: 'GET' }
  )

  const data = await response.json()

  return data
}

export default async function BookmarkCard({ url }: { url: string }) {
  const data = await getOGImage(url)

  return (
    <div className="p-2">
      <div className="h-28 relative flex border rounded overflow-hidden text-black mt-5">
        <a
          href={data.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex flex-col sm:flex-row"
        >
          <Image
            className="w-64 h-28 object-cover"
            src={data.image === '' ? default_img : data.image}
            width={250}
            height={106}
            alt="외부 이미지"
          />
          <div className="p-2 w-full ">
            <h3 className="text-[12px] min-h-6 mb-[2px]">{data.title}</h3>
            <p className="text-[12px] text-slate-400 h-8 overflow-hidden overflow-ellipsis ">
              {data.description}
            </p>
            <div className="absolute bottom-2 flex items-center gap-3">
              <Image
                src={data.icon === '' ? default_icon : default_icon}
                width={20}
                height={20}
                alt="icon"
              />
              <p className="text-[12px] overflow-hidden h-8 overflow-ellipsis pr-3">
                {url}
              </p>
            </div>
          </div>
        </a>
      </div>
    </div>
  )
}

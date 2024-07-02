/* eslint-disable @next/next/no-img-element */
import axios from 'axios'
import { load } from 'cheerio'

// const url = 'https://tailwindcss.com/docs/border-style'
const getOGImage = async (req: any) => {
  const url = req
  const hostname = new URL(req).hostname
  const { data } = await axios.get(url)
  const $ = load(data)

  const meta = {
    title: $('meta[property="og:title"]').attr('content') || $('title').text(),
    description:
      $('meta[property="og:description"]').attr('content') ||
      $('meta[name="description"]').attr('content'),
    image: $('meta[property="og:image"]').attr('content') || '',
    url,
    icon: `https://${hostname}${$('link[rel="icon"]').attr('href')}` || '',
  }
  return meta
}

export default async function BookmarkCard({ url }: { url: string }) {
  const data = await getOGImage(url)

  return (
    <div className="p-2">
      <div className="h-28 flex border rounded overflow-hidden text-black mt-5">
        <a
          href={data.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex flex-col sm:flex-row"
        >
          <img
            className="w-64 h-28 object-cover"
            src={data.image}
            width={250}
            height={106}
            alt="외부 이미지"
          />
          <div className="p-2 w-full ">
            <h3 className="text-base min-h-6 mb-[2px]">{data.title}</h3>
            <p className="text-sm text-slate-400 h-8">{data.description}</p>
            <div className="flex gap-3 mt-[6px]">
              <img src={data.icon} width={20} height={20} alt="icon" />
              <p className="text-sm ">{url}</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  )
}

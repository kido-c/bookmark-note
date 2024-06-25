import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

import activeLinkIcon from '@/app/assets/icons/link_active.png'
import disableLinkIcon from '@/app/assets/icons/link_disable.png'
import { Bookmark } from '@/app/types/bookmark'

interface Props extends Omit<Bookmark, 'category' | 'description'> {}

export default function BookmarkItem({ id, title, tags, url }: Props) {
  return (
    <Link href={`/bookmarks/${id}`}>
      <div className="w-72 h-32 relative border-2 rounded-2xl border-main bg-white py-2 px-4 cursor-pointer shadow-bookmark hover:bg-sub">
        <div className="flex-1 flex-col items-center justify-around font-semibold">
          <div className="flex gap-2">
            {tags.length > 0 &&
              tags.map((val) => (
                <div
                  className={`rounded-3xl px-2 text-[10px]`}
                  style={{ backgroundColor: val.bgColor, color: val.textColor }}
                  key={val.id}
                >
                  <span>{val.name}</span>
                </div>
              ))}
          </div>
          <div className="mt-6">
            <div className="font-bold text-sm text-ellipsis">{title}</div>
          </div>
          <div className="absolute bottom-4 right-4">
            <Link href={url} className="z-10">
              <>
                <Image
                  src={disableLinkIcon}
                  width={25}
                  height={25}
                  className="object-cover"
                  alt="disable link icon"
                />
                <Image
                  src={activeLinkIcon}
                  width={25}
                  height={25}
                  className="object-cover absolute top-0 left-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                  alt="active link icon"
                />
              </>
            </Link>
          </div>
        </div>
      </div>
    </Link>
  )
}

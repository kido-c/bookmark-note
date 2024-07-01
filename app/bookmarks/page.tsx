import React from 'react'
// import axios from 'axios'
import { cookies } from 'next/headers'

import BookmarkItem from '@/app/bookmarks/components/BookmarkItem'
import { GetBookmarksResponse } from '@/app/types/api'
import { groupByCategory } from '@/app/utils/groupByCategory'

const getBookmarks = async (): Promise<GetBookmarksResponse[]> => {
  const token = cookies().get('session')

  const response = await fetch(`${process.env.API_END_POINT}/bookmarks`, {
    next: { tags: ['bookmarks'] },
    credentials: 'same-origin',
    headers: {
      'Set-Cookie': `session=${token?.value};`,
    },
  })
  return response.json()
}

export default async function Bookmarkspage() {
  const bookmarks = await getBookmarks()

  return (
    <div className="m-5 rounded-xl bg-white ">
      <div className="flex gap-3 p-4">
        {Object.entries(groupByCategory(bookmarks)).map(
          ([category, bookmarks]) =>
            bookmarks.length > 0 && (
              <div
                className="w-80 bg-white relative  rounded-sm rounded-b-xl hover:border-x border-red-40"
                key={category}
              >
                <div className="bg-red-400 rounded-t-2xl h-2 w-full absolute -top-1" />
                <div className="px-4 pb-4">
                  <div className="mb-4 text-xl font-bold mt-2">{category}</div>
                  <div className="flex flex-col justify-center items-center gap-5 mb-4">
                    {bookmarks.map((bookmark) => (
                      <BookmarkItem
                        key={bookmark.id}
                        id={bookmark.id}
                        title={bookmark.title}
                        url={bookmark.url}
                        tags={bookmark.tags}
                      />
                    ))}
                  </div>
                  <div className="h-11 rounded-2xl flex justify-center items-center  text-main bg-main font-semibold">
                    + 북마크 추가하기
                  </div>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  )
}

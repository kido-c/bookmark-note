import React from 'react'
// import axios from 'axios'
import { cookies } from 'next/headers'

import DragDropBoard from '@/app/components/DragDropBoard'
import { GetBookmarksResponse } from '@/app/types/api'
import {
  makeBookmarksMapByCategory,
  getCatgories,
} from '@/app/utils/groupByCategory'

const getBookmarks = async (): Promise<GetBookmarksResponse[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_END_POINT}/bookmarks`,
    {
      method: 'GET',
      next: { tags: ['bookmarks', 'token'] },
      credentials: 'same-origin',
      headers: {
        Cookie: `${cookies().get('session')?.name}=${cookies().get('session')?.value}`,
      },
    }
  )
  return response.json()
}

export default async function Bookmarkspage() {
  const bookmarks = await getBookmarks()

  return (
    <div className="m-5 rounded-xl bg-white ">
      <div className="flex gap-3 p-4">
        {bookmarks.length > 0 && (
          <DragDropBoard
            bookmarksMap={makeBookmarksMapByCategory(bookmarks)}
            categories={getCatgories(bookmarks)}
          />
        )}
      </div>
    </div>
  )
}

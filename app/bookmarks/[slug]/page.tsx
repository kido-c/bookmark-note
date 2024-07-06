import React from 'react'
import { cookies } from 'next/headers'

import BookmarkCard from '@/app/bookmarks/[slug]/components/BookmarkCard'
import BookmarkForm from '@/app/bookmarks/[slug]/components/BookmarkForm'
import { GetBookmarkResponse } from '@/app/types/api'
import BrowserInBookmark from '@/app/bookmarks/[slug]/components/BrowserInBookmark'

const getBookmark = async (slug: string): Promise<GetBookmarkResponse> => {
  const token = cookies().get('session')

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_END_POINT}/bookmarks/${slug}`,
    {
      next: { tags: ['token'] },
      credentials: 'same-origin',
      headers: {
        'Set-Cookie': `session=${token?.value};`,
      },
    }
  )

  return response.json()
}

export default async function BookmarkDetail({
  params,
}: {
  params: { slug: string }
}) {
  // const bookmark = await getBookmark(params.slug)

  const bookmark = {
    id: 1,
    title: 'title',
    url: 'https://www.google.com',
    tags: [
      { id: 1, name: 'tag1', bgColor: 'black', textColor: 'white' },
      { id: 2, name: 'tag2', bgColor: 'black', textColor: 'white' },
    ],
    category: {
      name: 'category',
    },
  } as GetBookmarkResponse

  return (
    <div className="flex justify-between gap-10 w-full px-5">
      <section className="flex-1">
        <div className="w-full">
          <BrowserInBookmark url={bookmark.url} />
        </div>
        <BookmarkCard url={bookmark.url} />
      </section>
      <section className="flex-1">
        <BookmarkForm defaultValues={bookmark} />
      </section>
    </div>
  )
}

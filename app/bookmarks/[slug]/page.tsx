import React from 'react'
import { cookies } from 'next/headers'

import BookmarkCard from '@/app/bookmarks/[slug]/components/BookmarkCard'
import BookmarkForm from '@/app/bookmarks/[slug]/components/BookmarkForm'
import { GetBookmarkResponse } from '@/app/types/api'

const getBookmark = async (slug: string): Promise<GetBookmarkResponse> => {
  const token = cookies().get('session')

  const response = await fetch(`/api/bookmarks/${slug}`, {
    next: { tags: ['token'] },
    credentials: 'same-origin',
    headers: {
      'Set-Cookie': `session=${token?.value};`,
    },
  })

  return response.json()
}

export default async function BookmarkDetail({
  params,
}: {
  params: { slug: string }
}) {
  const bookmark = await getBookmark(params.slug)

  return (
    <div className="m-5 flex gap-4">
      <section className="w-1/2">
        <BookmarkForm defaultValues={bookmark} />
        <BookmarkCard url={bookmark.url} />
      </section>
      <section>
        <div className="min-w-sm">
          <iframe
            title="외부 링크"
            src={bookmark.url}
            width={600}
            height={600}
            style={{ borderRadius: '20px' }}
          />
        </div>
      </section>
    </div>
  )
}

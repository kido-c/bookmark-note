import React from 'react'

import BookmarkCard from '@/app/bookmarks/[slug]/components/BookmarkCard'

export default async function BookmarkDetail() {
  return (
    <div className="m-5 flex gap-4">
      <section className="flex flex-col gap-4">
        <div>
          <span className="text-slate-400">Update Date : </span>
          <input className="pl-3" defaultValue={'2024 / 02 / 05'} />
        </div>
        <div className="flex justify-start items-center gap-3">
          <span className="text-slate-400">Tags : </span>
          <div className="flex gap-2">
            {[
              { id: 1, name: 'react' },
              { id: 2, name: 'next' },
            ].map((val) => (
              <div
                className={`bg-blue text-blue rounded-3xl px-2 text-[10px]`}
                key={val.id}
              >
                <span>{val.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <span className="text-slate-400">Category : </span>
          <input className="pl-3" defaultValue={'TECH'} />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-slate-400">Description : </span>
          <textarea className="w-4/5 h-56 p-2 rounded-lg">
            Next로 프로젝트를 빌드하는 예시 자료입니다.
          </textarea>
        </div>
        <BookmarkCard />
      </section>
      <section>
        <div className="min-w-sm">
          <iframe
            title="외부 링크"
            src={'https://tailwindcss.com/docs/border-style'}
            width={600}
            height={600}
            style={{ borderRadius: '20px' }}
          />
        </div>
      </section>
    </div>
  )
}

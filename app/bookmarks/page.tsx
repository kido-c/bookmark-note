import React from 'react'

import BookmarkItem from '@/app/bookmarks/components/BookmarkItem'
import { bookmarkMock } from '@/app/mocks/bookmarkMock'

const data = [
  { id: 1, name: 'TECH' },
  { id: 2, name: 'DEVOPS ' },
  { id: 3, name: 'DESIGN ' },
]

export default function Bookmarkspage() {
  const bookMarkListByCategory = data.map((value: any) => {
    return {
      categoryName: value.name,
      bookmarkList: bookmarkMock.filter(
        (bookmark) => bookmark.categoryId === value.id
      ),
    }
  })

  return (
    <div className="m-5 rounded-xl bg-white ">
      <div className="flex gap-3 p-4">
        {bookMarkListByCategory.map(
          (category: any) =>
            category.bookmarkList.length > 0 && (
              <div
                className="w-80 bg-white relative  rounded-sm rounded-b-xl hover:border-x border-red-40"
                key={category.categoryName}
              >
                <div className="bg-red-400 rounded-t-2xl h-2 w-full absolute -top-1" />
                <div className="px-4 pb-4">
                  <div className="mb-4 text-xl font-bold mt-2">
                    {category.categoryName}
                  </div>
                  <div className="flex flex-col justify-center items-center gap-5 mb-4">
                    {category.bookmarkList.map((value: any) => (
                      <BookmarkItem key={value.BookMarkID} />
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

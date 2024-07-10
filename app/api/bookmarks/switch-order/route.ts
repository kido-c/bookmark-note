import { NextRequest, NextResponse } from 'next/server'

import prisma from '@/app/lib/prisma'
import { ReorderBookmarksMapResult } from '@/app/utils/reorder'

export async function PATCH(req: NextRequest) {
  try {
    const { orderBookmarks }: { orderBookmarks: ReorderBookmarksMapResult } =
      await req.json()

    // 카테고리 분류
    const category = Object.keys(orderBookmarks.bookmarksMap)

    const categories = await prisma.category.findMany({
      where: { name: { in: category } },
    })

    // TODO : 코드 개선 필요, 반복문이 너무 많음.
    Object.entries(orderBookmarks.bookmarksMap).forEach(
      async ([key, bookmarks]) => {
        bookmarks.forEach(async (bookmark, idx) => {
          // 순서가 재조정된 bookmarksMap에서 속한 category와 bookmark에 할당되어잇는 category가 다를 경우
          // ! 다른 칼럼으로 이동 되었음, bookmark에 할당되어있는 카테고리 변경 시켜주어야함.
          if (key !== bookmark.category.name) {
            await prisma.bookmark.update({
              where: { id: bookmark.id },
              data: {
                categoryId: categories.filter(
                  (category) => category.name === key
                )[0].id,
                orderIdx: idx,
              },
            })
          } else {
            // orderIdx는 넘어온 재조정된 bookmarksMap에서의 순서를 따른다.
            await prisma.bookmark.update({
              where: { id: bookmark.id },
              data: { orderIdx: idx },
            })
          }
        })
      }
    )

    return NextResponse.json({ message: 'suceess' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'message' }, { status: 500 })
  }
}

// app/api/bookmarks/route.ts
import { NextRequest, NextResponse } from 'next/server'

import prisma from '../../lib/prisma'

interface PostBookmarkRequest {
  url: string
  name: string
  tags: string[]
  category: string
  description: string
}

export async function GET() {
  // const auth = req.headers.get('Authorization')

  // if (!auth) {
  //   return NextResponse.json({ error: 'Not authorized' }, { status: 401 })
  // }

  try {
    const bookmarks = await prisma.bookmark.findMany({
      include: {
        category: true,
        tags: true,
      },
    })

    return NextResponse.json(bookmarks)
  } catch (error) {
    return NextResponse.json({ error: 'message' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { url, name, tags, category, description }: PostBookmarkRequest =
      await req.json()

    console.log(url, name, tags, category, description)

    // 이미 존재하는 url인지 확인
    const alreadyExsistUrl = await prisma.bookmark.findFirst({
      where: { url },
    })

    if (alreadyExsistUrl) {
      return NextResponse.json({ error: 'url already exists' }, { status: 400 })
    }

    // 이미 존재하는 카테고리인지 확인, 없다면 생성
    let targetCategory = await prisma.category.findFirst({
      where: { category_name: category },
    })

    if (!targetCategory) {
      targetCategory = await prisma.category.create({
        data: { category_name: category },
      })
    }

    // 이미 존재하는 태그인지 확인, 없다면 생성
    const targetTags = await Promise.all(
      tags.map(async (tag: string) => {
        let tagRecord = await prisma.tag.findFirst({
          where: { tag_name: tag },
        })
        if (!tagRecord) {
          tagRecord = await prisma.tag.create({
            data: { tag_name: tag },
          })
        }
        return tagRecord
      })
    )

    // 북마크 생성 및 태그 연결
    const newBookmark = await prisma.bookmark.create({
      data: {
        url,
        title: name,
        description,
        category: {
          connect: { category_id: targetCategory.category_id },
        },
        user: {
          connect: { user_id: 1 }, // 예시: user_id를 1로 설정, 실제로는 적절한 user_id를 사용해야 합니다.
        },
        tags: {
          create: targetTags.map((tag) => ({
            tag: {
              connect: { tag_id: tag.tag_id },
            },
          })),
        },
      },
    })

    return NextResponse.json(
      { success: true, data: newBookmark },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json({ error: 'message' }, { status: 500 })
  }
}

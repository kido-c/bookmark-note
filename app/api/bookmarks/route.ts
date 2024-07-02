import { NextRequest, NextResponse } from 'next/server'

import { getRandomDarkColor, lightenColor } from '@/app/utils/colors'
import { PostBookmarkRequest } from '@/app/types/api'
import { extractTokenFromCookie, verifySession } from '@/app/lib/action'

import prisma from '../../lib/prisma'

export async function GET(req: NextRequest) {
  const token = await extractTokenFromCookie(req.headers.getSetCookie()[0])

  const verifiedUser = await verifySession(token)

  try {
    const bookmarks = await prisma.bookmark.findMany({
      where: { userId: verifiedUser.id },
      select: {
        id: true,
        title: true, // 명시적으로 포함할 필드
        url: true, // 명시적으로 포함할 필드
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
      },
    })

    const transformedBookmarks = bookmarks.map((bookmark) => ({
      ...bookmark,
      tags: bookmark.tags.map((bookmarkTag) => bookmarkTag.tag),
    }))

    return NextResponse.json(transformedBookmarks)
  } catch (error) {
    return NextResponse.json({ error: 'message' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { url, name, tags, category, description }: PostBookmarkRequest =
      await req.json()

    const token = await extractTokenFromCookie(req.headers.get('cookie'))

    const verifiedUser = await verifySession(token)

    // 이미 존재하는 url인지 확인
    const alreadyExsistUrl = await prisma.bookmark.findFirst({
      where: { url },
    })

    if (alreadyExsistUrl) {
      return NextResponse.json({ error: 'url already exists' }, { status: 400 })
    }

    // 이미 존재하는 카테고리인지 확인, 없다면 생성
    let targetCategory = await prisma.category.findFirst({
      where: { name: category },
    })

    if (!targetCategory) {
      targetCategory = await prisma.category.create({
        data: { name: category },
      })
    }

    // 이미 존재하는 태그인지 확인, 없다면 생성
    const targetTags = await Promise.all(
      tags.map(async (tag: string) => {
        let tagRecord = await prisma.tag.findFirst({
          where: { name: tag },
        })
        if (!tagRecord) {
          const textColor = getRandomDarkColor()
          const bgColor = lightenColor(textColor)

          tagRecord = await prisma.tag.create({
            data: { name: tag, textColor, bgColor },
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
          connect: { id: targetCategory.id },
        },
        user: {
          connect: { id: verifiedUser.id }, // 예시: user_id를 1로 설정, 실제로는 적절한 user_id를 사용해야 합니다.
        },
        tags: {
          create: targetTags.map((tag) => ({
            tag: {
              connect: { id: tag.id },
            },
          })),
        },
      },
    })

    return NextResponse.json(
      { success: true, data: newBookmark.id },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json({ error: 'message' }, { status: 500 })
  }
}

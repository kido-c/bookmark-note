import { NextRequest, NextResponse } from 'next/server'

import prisma from '../../../lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const bookmark = await prisma.bookmark.findUnique({
      where: { id: Number(params.slug) },
      include: {
        user: false,
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    })

    if (!bookmark) {
      return NextResponse.json({ error: 'bookmark not found' }, { status: 404 })
    }

    const transformedBookmark = {
      ...bookmark,
      tags: bookmark.tags.map((bookmarkTag) => bookmarkTag.tag),
    }

    return NextResponse.json(transformedBookmark)
  } catch (error) {
    return NextResponse.json({ error: 'message' }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const data = await request.json()

    const curCategory = data.category.name

    const alreadyExsistCategory = await prisma.category.findFirst({
      where: { name: curCategory },
    })

    let categoryId

    if (!alreadyExsistCategory) {
      // orderIdx 마지막 index에서 추가
      const categories = await prisma.category.findMany()

      const lastOrderIndex = categories.sort(
        (a, b) => b.orderIdx - a.orderIdx
      )[0].orderIdx

      const newCategory = await prisma.category.create({
        data: { name: curCategory, orderIdx: lastOrderIndex + 1 },
      })

      categoryId = newCategory.id
    } else {
      categoryId = alreadyExsistCategory.id
    }

    const updatedBookmark = await prisma.bookmark.update({
      where: { id: Number(params.slug) },
      data: {
        title: data.title,
        description: data.description,
        categoryId,
      },
      include: {
        user: false,
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    })

    const transformedBookmark = {
      ...updatedBookmark,
      tags: updatedBookmark.tags.map((bookmarkTag) => bookmarkTag.tag),
    }

    return NextResponse.json(transformedBookmark.id, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'message' }, { status: 500 })
  }
}

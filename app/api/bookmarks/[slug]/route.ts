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
    const { id, ...data } = await request.json()

    console.log(id, data, params.slug)

    const curCategory = data.category.name

    const alreadyExsistCategory = await prisma.category.findFirst({
      where: { name: curCategory },
    })

    let categoryId

    if (!alreadyExsistCategory) {
      const newCategory = await prisma.category.create({
        data: { name: curCategory },
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

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

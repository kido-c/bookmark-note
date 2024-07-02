import { NextRequest, NextResponse } from 'next/server'

import prisma from '@/app/lib/prisma'
import { getRandomDarkColor, lightenColor } from '@/app/utils/colors'

export async function GET() {
  try {
    const tag = await prisma.tag.findMany()
    return NextResponse.json(tag)
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching categories' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  const body: { name: string } = await req.json()

  const newTag = body.name

  const tags = await prisma.tag.findMany()

  const isDuplicate = tags.find((tag) => tag.name === newTag)

  if (isDuplicate) {
    return NextResponse.json(
      { error: 'Category already exists' },
      { status: 400 }
    )
  }

  const textColor = getRandomDarkColor()
  const bgColor = lightenColor(textColor)

  try {
    const newTags = await prisma.tag.create({
      data: {
        name: newTag,
        textColor,
        bgColor,
      },
    })
    return NextResponse.json(newTags.id, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error creating newCategory' },
      { status: 500 }
    )
  }
}

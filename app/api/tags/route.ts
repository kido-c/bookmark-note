import { NextRequest, NextResponse } from 'next/server'

import prisma from '@/app/lib/prisma'

export async function GET() {
  try {
    const tag = await prisma.tag.findMany()
    return NextResponse.json(tag)
  } catch (error) {
    console.log(error)
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

  const isDuplicate = tags.find((tag) => tag.tag_name === newTag)

  if (isDuplicate) {
    return NextResponse.json(
      { error: 'Category already exists' },
      { status: 400 }
    )
  }

  try {
    const newCategories = await prisma.tag.create({
      data: {
        tag_name: newTag,
      },
    })
    return NextResponse.json(newCategories, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error creating newCategory' },
      { status: 500 }
    )
  }
}

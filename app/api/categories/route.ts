import { NextRequest, NextResponse } from 'next/server'

import prisma from '@/app/lib/prisma'

export async function GET() {
  try {
    const categories = await prisma.category.findMany()
    return NextResponse.json(categories)
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching categories' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  const body: { name: string } = await req.json()

  const newCategory = body.name

  const categories = await prisma.category.findMany()

  const isDuplicate = categories.find(
    (category) => category.name === newCategory
  )

  if (isDuplicate) {
    return NextResponse.json(
      { error: 'Category already exists' },
      { status: 400 }
    )
  }

  try {
    const newCategories = await prisma.category.create({
      data: {
        name: newCategory,
      },
    })
    return NextResponse.json(newCategories.id, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error creating newCategory' },
      { status: 500 }
    )
  }
}

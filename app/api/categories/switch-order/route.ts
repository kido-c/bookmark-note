import { NextRequest, NextResponse } from 'next/server'

import prisma from '@/app/lib/prisma'

export async function PATCH(req: NextRequest) {
  try {
    const { current, next } = await req.json()

    // 이동한 catgoery id
    const currentCateory = await prisma.category.findUnique({
      where: { id: current },
    })
    // 이동 당한 catgoery id
    const nextCategory = await prisma.category.findUnique({
      where: { id: next },
    })

    const currentCateoryOrderIdx = currentCateory?.orderIdx
    const nextCategoryIdx = nextCategory?.orderIdx

    // 각각의 category들의 orderIdx 교체
    await prisma.category.update({
      where: { id: current },
      data: { orderIdx: nextCategoryIdx },
    })

    await prisma.category.update({
      where: { id: next },
      data: { orderIdx: currentCateoryOrderIdx },
    })

    return NextResponse.json({ message: 'suceess' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'message' }, { status: 500 })
  }
}

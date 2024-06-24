import { NextRequest, NextResponse } from 'next/server'
import { compare } from 'bcrypt'

import prisma from '@/app/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    const matchUser = await prisma.user.findFirst({
      where: { email },
    })

    if (!matchUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 401 })
    }

    const comparePassword = await compare(password, matchUser.password)

    if (!comparePassword) {
      return NextResponse.json({ error: 'Password not match' }, { status: 401 })
    }

    return NextResponse.json(matchUser, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error creating newCategory' },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { compare } from 'bcrypt'

import prisma from '@/app/lib/prisma'
import { createSession } from '@/app/lib/action'

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

    createSession(matchUser.id, matchUser.email)

    return NextResponse.json({ data: matchUser.id }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error creating newCategory' },
      { status: 500 }
    )
  }
}

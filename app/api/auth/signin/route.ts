import { NextRequest, NextResponse } from 'next/server'
import { compare } from 'bcrypt'
import jwt from 'jsonwebtoken'

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
    const token = jwt.sign(
      { id: matchUser.id, email: matchUser.email },
      process.env.JWT_SECRET || 'defaultSecret'
    )

    return NextResponse.json('sucess', {
      status: 200,
      headers: {
        'Set-Cookie': `token=${token}`,
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error creating newCategory' },
      { status: 500 }
    )
  }
}

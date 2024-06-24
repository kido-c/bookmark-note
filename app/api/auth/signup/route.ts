import { hash } from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server'

import prisma from '@/app/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json()

    const hashedPassword = await hash(password, 10)

    const matchUser = await prisma.user.findFirst({ where: { email } })

    if (matchUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 401 }
      )
    }

    const newUser = await prisma.user.create({
      data: {
        username: name,
        email,
        password: hashedPassword,
      },
    })

    if (!newUser) {
      return NextResponse.json(
        { error: 'Error creating new user' },
        { status: 500 }
      )
    }

    return NextResponse.json('sucess create user', { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error creating newCategory' },
      { status: 500 }
    )
  }
}

'use server'

import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

import { User } from '@/app/types/user'

const secretKey = process.env.NEXT_PUBLIC_NEXTAUTH_SECRET

export async function revalidateBookmarks() {
  revalidateTag('bookmarks')
}

export async function revalidateWithAuth() {
  revalidateTag('token')
}

function checkLastSemi(str: string) {
  return str.slice(-1) === ';'
}

export async function extractTokenFromCookie(cookie: string | null) {
  if (!cookie) {
    return null
  }
  let token = cookie.split('=')[1]

  const includeSemi = checkLastSemi(token)

  if (includeSemi) {
    token = token.slice(0, -1)
  }

  return token
}

export async function encrypt(payload: { id: number; email: string }) {
  return jwt.sign(payload, secretKey as string, {
    algorithm: 'HS256',
    expiresIn: '1hr',
  })
}

export async function decrypt(session: string): Promise<User | null> {
  try {
    const payload = jwt.verify(session, secretKey as string, {
      algorithms: ['HS256'],
    }) as User

    return payload
  } catch (error) {
    return null
  }
}

export async function createSession(id: number, email: string) {
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000)
  const session = await encrypt({ id, email })

  cookies().set('session', session, {
    // TODO: 추후 인증관련 설정 변경 시 수정
    // httpOnly: true,
    // secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}

export async function getSession() {
  const token = cookies().get('session')?.value
  if (!token) return null
  return await decrypt(token)
}

export async function deleteSession() {
  cookies().set('session', '', { expires: new Date(0) })
}

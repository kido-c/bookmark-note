import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const accessWithoutAuth = /^\/auth\/(signin|signup)$/ // /auth/signin, /auth/signup
const accessWithAuthRegex = /^\/bookmarks(\/(\d+)?)?$/ // /bookmarks, /bookmarks/1 ...

export function middleware(request: NextRequest) {
  let token = request.cookies.get('session')

  if (token && accessWithoutAuth.test(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (!token && accessWithAuthRegex.test(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }
}

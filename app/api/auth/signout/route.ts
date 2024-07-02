import { NextResponse, NextRequest } from 'next/server'

import { deleteSession } from '@/app/lib/action'

export async function POST() {
  deleteSession()

  return NextResponse.json('sucess logout', {
    status: 200,
  })
}

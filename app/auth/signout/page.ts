'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'

import { revalidateWithAuth } from '@/app/lib/action'

export default function SignoutPage() {
  const rotuer = useRouter()

  const postSignout = (): Promise<{ data: string }> => {
    return axios.post(`/api/auth/signout`)
  }

  postSignout().then(() => {
    revalidateWithAuth()
    rotuer.push('/')
  })
}

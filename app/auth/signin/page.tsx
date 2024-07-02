'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export interface SigninForm {
  email: string
  password: string
}

export default function SigninPage() {
  const { register, handleSubmit } = useForm<SigninForm>()
  const router = useRouter()
  const onSubmit = (data: SigninForm) => {
    axios.post(`http://localhost:3000/api/auth/signin`, data).then(() => {
      router.push('/')
      // todo: 서버 컴포넌트에서 쿠키 변경을 감지 못하여 임의 새로고침 실시
      // 추후 수정 필요
      router.refresh()
    })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center items-center h-full w-full gap-3 px-8"
    >
      <input
        {...register('email')}
        placeholder="이메일을 입력해주세요."
        className="w-full h-12 rounded-lg p-3"
      />
      <input
        {...register('password')}
        placeholder="비밀번호를 입력해주세요."
        className="w-full h-12 rounded-lg p-3"
      />
      <div className="flex flex-col w-full mt-2 gap-3">
        <button
          type="submit"
          className="bg-blue w-full h-12 rounded-lg  font-semibold"
        >
          로그인
        </button>
        <button
          type="button"
          className="bg-blue w-full h-12 rounded-lg  font-semibold"
        >
          회원 가입
        </button>
      </div>
    </form>
  )
}

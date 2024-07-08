'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import axios from 'axios'

import { isEmail } from '@/app/utils/validation/isEmail'

export interface SigninForm {
  email: string
  password: string
}

export default function SigninPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninForm>()

  const router = useRouter()

  const onSubmit = (data: SigninForm) => {
    axios.post(`/api/auth/signin`, data).then(() => {
      router.push('/')
      // todo: 서버 컴포넌트에서 쿠키 변경을 감지 못하여 임의 새로고침 실시
      // 추후 수정 필요
      router.refresh()
    })
  }

  const moveToSignup = () => {
    router.push('/auth/signup')
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center items-center h-full w-full px-8"
    >
      <div className="w-full flex flex-col gap-1 h-20">
        <input
          {...register('email', {
            required: '이메일을 입력해주세요.',
            validate: (value) =>
              isEmail(value) || '이메일 형식에 맞지 않습니다.',
          })}
          placeholder="이메일을 입력해주세요."
          className="w-full h-12 rounded-lg p-3"
        />
        {errors.email && (
          <p className="text-red-500 text-sm ">{errors.email.message}</p>
        )}
      </div>
      <div className="w-full flex flex-col gap-1 h-20">
        <input
          type="password"
          {...register('password', { required: '비밀번호를 입력해주세요.' })}
          placeholder="비밀번호를 입력해주세요."
          className="w-full h-12 rounded-lg p-3"
        />
        {errors.password && (
          <p className="text-red-500 text-sm ">{errors.password.message}</p>
        )}
      </div>
      <div className="flex flex-col w-full mt-2 gap-3">
        <button
          type="submit"
          className="bg-active text-white w-full h-12 rounded-lg  font-semibold"
        >
          로그인
        </button>
        <button
          type="button"
          onClick={moveToSignup}
          className=" border-active border text-main w-full h-12 rounded-lg  font-semibold"
        >
          회원 가입
        </button>
      </div>
    </form>
  )
}

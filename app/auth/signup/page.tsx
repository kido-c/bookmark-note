'use client'
import React from 'react'
import { useForm } from 'react-hook-form'

interface SignupForm {
  name: string
  birth: string
  email: string
  password: string
  passwordConfirm: string
}

export default function SignupPage() {
  const { register, handleSubmit } = useForm<SignupForm>()

  const onSubmit = (data: SignupForm) => {
    console.log(data)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center items-center h-full w-full gap-3 px-8"
    >
      <input
        {...register('name')}
        placeholder="이름을 입력해주세요."
        className="w-full h-12 rounded-lg p-3"
      />
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
      <input
        {...register('passwordConfirm')}
        placeholder="비밀번호를 확인해주세요."
        className="w-full h-12 rounded-lg p-3"
      />
      <div className="flex flex-col w-full mt-2 gap-3">
        <button
          type="submit"
          className="bg-blue w-full h-12 rounded-lg  font-semibold"
        >
          회원 가입
        </button>
      </div>
    </form>
  )
}

'use client'
import React from 'react'
import { useForm } from 'react-hook-form'

import { matchPassword } from '@/app/utils/validation/matchPassword'
import { isEmail } from '@/app/utils/validation/isEmail'

interface SignupForm {
  name: string
  email: string
  password: string
  passwordConfirm: string
}

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupForm>()

  const onSubmit = (data: SignupForm) => {
    fetch(`/api/auth/signup`, {
      body: JSON.stringify(data),
      method: 'POST',
    })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center items-center h-full w-full px-8"
    >
      <div className="w-full flex flex-col gap-1 h-20">
        <input
          {...register('name', { required: '이름을 입력해주세요.' })}
          placeholder="이름을 입력해주세요."
          className="w-full h-12 rounded-lg p-3"
        />
        {errors.name && (
          <p className="text-red-500 text-sm ">{errors.name.message}</p>
        )}
      </div>
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
          <p className="text-red-500  text-sm ">{errors.email.message}</p>
        )}
      </div>
      <div className="w-full flex flex-col gap-1 h-20">
        <input
          {...register('password', {
            required: '비밀번호를 입력해주세요.',
            minLength: {
              value: 8,
              message: '비밀번호는 8자 이상이어야 합니다.',
            },
          })}
          type="password"
          placeholder="비밀번호를 입력해주세요."
          className="w-full h-12 rounded-lg p-3"
        />
        {errors.password && (
          <p className="text-red-500  text-sm ">{errors.password.message}</p>
        )}
      </div>

      <div className="w-full flex flex-col gap-1 h-20">
        <input
          {...register('passwordConfirm', {
            required: '비밀번호를 입력해주세요.',
            minLength: {
              value: 8,
              message: '비밀번호는 8자 이상이어야 합니다.',
            },
            validate: (value) =>
              matchPassword(value, watch('password')) ||
              '비밀번호가 일치하지 않습니다.',
          })}
          type="password"
          placeholder="비밀번호를 확인해주세요."
          className="w-full h-12 rounded-lg p-3"
        />
        {errors.passwordConfirm && (
          <p className="text-red-500  text-sm ">
            {errors.passwordConfirm.message}
          </p>
        )}
      </div>
      <div className="flex flex-col w-full mt-2 gap-3">
        <button
          type="submit"
          className="hover:bg-active hover:text-white border-active border text-main w-full h-12 rounded-lg font-semibold "
        >
          회원 가입
        </button>
      </div>
    </form>
  )
}

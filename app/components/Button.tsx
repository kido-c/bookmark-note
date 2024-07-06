'use client'

import React from 'react'

interface Props {
  title: string
  handleClick?: () => void
  type?: 'submit' | 'reset' | 'button'
  style: 'active' | 'border'
}

export default function Button({ title, type, style, handleClick }: Props) {
  if (style === 'active') {
    return (
      <button
        onClick={handleClick}
        type={type}
        className="w-full bg-active text-white border-2 border-active font-semibold px-4 py-2 mt-4 rounded-md hover:border-active hover:border-2 hover:bg-inherit hover:text-main"
      >
        {title}
      </button>
    )
  }

  return (
    <button
      onClick={handleClick}
      type={type}
      className="w-full border-active border-2 text-main font-semibold px-4 py-2 mt-4 rounded-md hover:bg-active  hover:text-white"
    >
      {title}
    </button>
  )
}

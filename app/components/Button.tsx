'use client'

import React from 'react'

interface Props {
  title: string
  handleClick?: () => void
  type: 'active' | 'border'
}

export default function Button({ title, type, handleClick }: Props) {
  if (type === 'active') {
    return (
      <button
        onClick={handleClick}
        className="bg-active text-white border-2 border-active font-semibold px-4 py-2 mt-4 rounded-md hover:border-active hover:border-2 hover:bg-inherit hover:text-main"
      >
        {title}
      </button>
    )
  }

  return (
    <button
      onClick={handleClick}
      className=" border-active border-2 text-main font-semibold px-4 py-2 mt-4 rounded-md hover:bg-active  hover:text-white"
    >
      {title}
    </button>
  )
}

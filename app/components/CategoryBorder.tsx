'use client'
import React from 'react'

import { getRandomLightColor } from '@/app/utils/colors'

export default function CategoryBorder() {
  const categoryBgColor = getRandomLightColor()

  return (
    <div
      style={{ backgroundColor: categoryBgColor }}
      className="rounded-t-2xl h-2 w-full absolute -top-1"
    />
  )
}

// 'use client'

import React from 'react'

interface Props {
  id?: number
  name?: string
  bgColor?: string
  textColor?: string
}

export default function Tag({
  id = 1,
  name = 'test',
  bgColor = '#CEF2D0',
  textColor = '#0000',
}: Props) {
  let textTagColor = `bg-[${bgColor}]`
  let textSize = `text-[${textColor}]`

  // const [tagBgColor, setTagBgColor] = useState('')
  // const [tagTextColor, setTagTextColor] = useState('')

  // useEffect(() => {
  //   const convertBgColor = `bg-[${bgColor}]`
  //   const convertTextColor = `text-[${textColor}]`

  //   setTagBgColor(convertBgColor)
  //   setTagTextColor(convertTextColor)
  // }, [bgColor, textColor])

  return (
    <div
      className={`${textTagColor} ${textSize} rounded-3xl px-2 text-[10px]`}
      key={id}
    >
      <span>{name}</span>
    </div>
  )
}

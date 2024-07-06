'use client'
import React, { useEffect, useState } from 'react'

interface Props {
  url: string
}

export default function BrowserInBookmark({ url }: Props) {
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadContent, setIsLoadContent] = useState(false)

  const checkXFrameOptions = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_END_POINT}/checkurl?url=${encodeURIComponent(url)}`,
        { method: 'GET' }
      )

      const data = await response.json()

      return data
    } catch (error) {
      console.log(error)
      throw new Error('Error checkXFrameOptions')
    }
  }

  useEffect(() => {
    checkXFrameOptions()
      .then((res) => {
        console.log('hit res')
        setIsLoading(false)
        res.xFrameOptions === 'not set'
          ? setIsLoadContent(true)
          : setIsLoadContent(false)
      })
      .catch(() => {
        console.log('hit')
        setIsLoading(false)
        setIsLoadContent(false)
      })
  }, [])

  return (
    <div className="relative">
      {isLoading ? (
        <div className="text-white text-center w-full h-[480px] bg-active flex justify-center items-center rounded-3xl opacity-80 ">
          페이지를 불러오고 있습니다....
        </div>
      ) : isLoadContent ? (
        <iframe
          title="outerBrowser"
          src={url}
          style={{ borderRadius: '20px', width: '100%', height: '480px' }}
        />
      ) : (
        <div className="text-white text-center  w-full h-[480px] bg-active flex justify-center items-center rounded-3xl opacity-80 ">
          북마크로 연결되어있는 링크가 보안상의 <br />
          이유로 참조를 허락하지 않습니다.
        </div>
      )}
    </div>
  )
}

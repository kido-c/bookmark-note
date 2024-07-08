import http from 'http'
import https from 'https'

import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const url = searchParams.get('url')

  // 유효하지 않은 URL이 전달되면 400 Bad Request를 반환합니다.
  if (!url) {
    return new Response(
      JSON.stringify({ error: 'URL parameter is required' }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }

  const protocol = url.startsWith('https') ? https : http

  // 해당 URL의 X-Frame-Options 헤더를 가져옵니다.
  return new Promise((resolve) => {
    protocol
      .get(url, (response) => {
        const xFrameOptions = response.headers['x-frame-options']
        resolve(
          new Response(
            // xFrameOptions 헤더가 설정되어 있지 않으면 'not set'을 반환합니다.
            // 클라이언트는 이 값을 사용하여 해당 URL이 iframe으로 로드될 수 있는지 확인할 수 있습니다.
            JSON.stringify({
              xFrameOptions: xFrameOptions || 'not set',
            }),
            {
              status: 200,
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )
        )
      })
      .on('error', (e) => {
        resolve(
          new Response(JSON.stringify({ error: `Error: ${e.message}` }), {
            status: 500,
            headers: {
              'Content-Type': 'application/json',
            },
          })
        )
      })
  })
}

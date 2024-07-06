import axios from 'axios'
import { load } from 'cheerio'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const url = searchParams.get('url')
  const hostname = new URL(req.url).hostname

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
  try {
    const { data } = await axios.get(url)
    const $ = load(data)

    const meta = {
      title:
        $('meta[property="og:title"]').attr('content') || $('title').text(),
      description:
        $('meta[property="og:description"]').attr('content') ||
        $('meta[name="description"]').attr('content'),
      image: $('meta[property="og:image"]').attr('content') || '',
      url,
      icon: `https://${hostname}${$('link[rel="icon"]').attr('href')}` || '',
    }

    return NextResponse.json(meta, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching url' }, { status: 500 })
  }
}

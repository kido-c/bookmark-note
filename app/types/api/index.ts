import { Bookmark, Tag } from '@prisma/client'

import { Category } from '@/app/types/bookmark'

export interface PostBookmarkRequest {
  url: string
  name: string
  tags: string[]
  category: string
  description: string
}

export interface PostBookmarkResponse {
  id: number
}

export interface GetBookmarkResponse extends Bookmark {
  tags: Tag[]
  category: Category
}

export interface GetBookmarkRequest {
  id: number
}

export interface GetBookmarksRequest {}

export interface GetBookmarksResponse
  extends Omit<
    GetBookmarkResponse,
    'description' | 'categoryId' | 'userId' | 'createdAt' | 'updatedAt'
  > {}

export interface PatchBookmarkRequest
  extends Partial<
    Omit<Bookmark, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
  > {}

export interface PatchBookmarkResponse {
  id: number
}

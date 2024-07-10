import { GetBookmarksResponse } from '@/app/types/api'
import { Category } from '@/app/types/bookmark'

export interface BookmarksMapByCategory {
  [key: string]: GetBookmarksResponse[]
}

const filterByCatgory = (
  category: Category,
  bookmarks: GetBookmarksResponse[]
): GetBookmarksResponse[] =>
  bookmarks
    .filter((bookmark) => bookmark.category.name === category.name)
    .sort((a, b) => a.orderIdx - b.orderIdx)

export const getCatgories = (bookmarks: GetBookmarksResponse[]): Category[] => {
  return bookmarks
    .map((bookmark) => bookmark.category)
    .filter((v, i, a) => a.indexOf(v) === i)
    .sort((a, b) => a.orderIdx - b.orderIdx)
}

export const makeBookmarksMapByCategory = (
  bookmarks: GetBookmarksResponse[]
): BookmarksMapByCategory => {
  // 카테고리 목록 추축 with 중복 제거
  const categories = getCatgories(bookmarks)

  // 카테고리 이름을 키로하는 bookmark map 생성
  const bookmarksMapByCategory = categories.reduce((acc, category) => {
    // 카테고리 이름 없는 bookmark들은 '카테고리 미정'으로 설정
    if (category.name === '') {
      return {
        ...acc,
        '카테고리 미정': filterByCatgory(category, bookmarks),
      }
    } else {
      return {
        ...acc,
        [category.name]: filterByCatgory(category, bookmarks),
      }
    }
  }, {})
  return bookmarksMapByCategory
}

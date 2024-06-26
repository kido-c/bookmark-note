import { GetBookmarksResponse } from '../types/api'

export const groupByCategory = (
  bookmarks: GetBookmarksResponse[]
): Record<string, GetBookmarksResponse[]> => {
  return bookmarks.reduce(
    (acc, bookmark) => {
      const category = bookmark.category.name
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(bookmark)
      return acc
    },
    {} as Record<string, GetBookmarksResponse[]>
  )
}

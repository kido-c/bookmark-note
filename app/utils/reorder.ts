import { DraggableLocation } from '@hello-pangea/dnd'

import { BookmarksMapByCategory } from '@/app/utils/groupByCategory'
import { GetBookmarksResponse } from '@/app/types/api'
import { Category } from '@/app/types/bookmark'

export function reorder<Bookmarks>(
  list: Bookmarks[],
  startIndex: number,
  endIndex: number
): Bookmarks[] {
  const result = [...list]
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

interface ReorderBookmarksMapArgs {
  bookmarksMap: BookmarksMapByCategory
  source: DraggableLocation
  destination: DraggableLocation
}

export interface ReorderBookmarksMapResult {
  bookmarksMap: BookmarksMapByCategory
}

export const reorderBookmarksMap = ({
  bookmarksMap,
  source,
  destination,
}: ReorderBookmarksMapArgs): ReorderBookmarksMapResult => {
  // drag한 item이 속한 컬럼의 bookmarks
  const current: GetBookmarksResponse[] = [...bookmarksMap[source.droppableId]]
  // drop한 컬럼의 bookmarks
  const next: GetBookmarksResponse[] = [
    ...bookmarksMap[destination.droppableId],
  ]

  // drag한 item
  const target: GetBookmarksResponse = current[source.index]

  // 동일한 컬럼내의 이동
  if (source.droppableId === destination.droppableId) {
    const reordered: GetBookmarksResponse[] = reorder(
      current,
      source.index,
      destination.index
    )
    const result: BookmarksMapByCategory = {
      ...bookmarksMap,
      [source.droppableId]: reordered,
    }
    return {
      bookmarksMap: result,
    }
  }

  // 다른 컬럼으로 이동

  // 이동한 컬럼에서 해당 item 삭제
  current.splice(source.index, 1)

  // 이동할 컬럼에서 해당 item 추가
  next.splice(destination.index, 0, target)

  const result: BookmarksMapByCategory = {
    ...bookmarksMap,
    [source.droppableId]: current,
    [destination.droppableId]: next,
  }

  return {
    bookmarksMap: result,
  }
}

interface SwitchColumnsArgs {
  categories: Category[]
  source: DraggableLocation
  destination: DraggableLocation
  orderedByCategory: string[]
}

export const switchColumns = ({
  categories,
  source,
  destination,
  orderedByCategory,
}: SwitchColumnsArgs): number[] => {
  const sourceColumIdx = categories.filter(
    (category) => category.name == orderedByCategory[source.index]
  )[0].id

  const destinationColumIdx = categories.filter(
    (category) => category.name == orderedByCategory[destination.index]
  )[0].id

  return [sourceColumIdx, destinationColumIdx]
}

'use client'

import React, { useCallback, useState } from 'react'
import { DragDropContext, Droppable, type DropResult } from '@hello-pangea/dnd'
import axios from 'axios'

import DragDropColumn from '@/app/components/DragDropColumn'
import { BookmarksMapByCategory } from '@/app/utils/groupByCategory'
import {
  reorder,
  reorderBookmarksMap,
  switchColumns,
} from '@/app/utils/reorder'
import { Category } from '@/app/types/bookmark'

export default function DragDropBoard({
  bookmarksMap,
  categories,
}: {
  bookmarksMap: BookmarksMapByCategory
  categories: Category[]
}) {
  const [orderedBookmarksMap, setOrderedBookmarksMap] = useState({
    columns: bookmarksMap,
    ordered: Object.keys(bookmarksMap),
  })

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) return

      const { source, destination } = result

      // 컬럼 이동
      if (result.type === 'column') {
        const orderedByCategory = reorder(
          orderedBookmarksMap.ordered,
          source.index,
          destination.index
        )

        setOrderedBookmarksMap({
          ...orderedBookmarksMap,
          ordered: orderedByCategory,
        })

        // 위치가 변경된 colum의 카테고리 id 추출
        const [sourceColumIdx, destinationColumIdx] = switchColumns({
          categories,
          source,
          destination,
          orderedByCategory,
        })

        axios
          .patch(`/api/categories/switch-order`, {
            current: sourceColumIdx,
            next: destinationColumIdx,
          })
          .catch(() => alert('변경이 실패하였습니다. 다시 시도해주세요'))

        return
      }

      const orderedByCategory = reorderBookmarksMap({
        bookmarksMap: orderedBookmarksMap.columns,
        source,
        destination,
      })

      setOrderedBookmarksMap({
        ...orderedBookmarksMap,
        columns: orderedByCategory.bookmarksMap,
      })

      // 순서가 변경된 bookmark 전체 전달
      // TODO: 전체가 전달되는 것은 비효율적인 것 같음. 추후 개선 필요 ( 변경된 것 만 전달 되든지 등)
      axios
        .patch(`/api/bookmarks/switch-order`, {
          orderBookmarks: orderedByCategory,
        })
        .catch(() => alert('변경이 실패하였습니다. 다시 시도해주세요'))
    },
    [bookmarksMap, categories]
  )

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <div
            className="flex gap-3 p-4"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {orderedBookmarksMap.ordered.map((key, idx) => (
              <DragDropColumn
                key={key}
                category={key}
                bookmarks={orderedBookmarksMap.columns[key]}
                idx={idx}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

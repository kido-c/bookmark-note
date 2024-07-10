'use client'

import React from 'react'
import { Draggable, Droppable } from '@hello-pangea/dnd'

import { GetBookmarksResponse } from '@/app/types/api'
import DragItem from '@/app/components/DragItem'
import CategoryBorder from '@/app/components/CategoryBorder'

export default function DragDropColumn({
  bookmarks,
  category,
  idx,
}: {
  bookmarks: GetBookmarksResponse[]
  category: string
  idx: number
}) {
  return (
    <Draggable key={idx} draggableId={category} index={idx}>
      {(provied) => (
        <div
          className="w-80 bg-white relative  rounded-sm rounded-b-xl border-red-40"
          ref={provied.innerRef}
          {...provied.draggableProps}
          {...provied.dragHandleProps}
        >
          <CategoryBorder />
          <div className="px-4 pb-4">
            <div className="mb-4 text-xl font-bold mt-2">
              {category ? category : '카테고리 미정'}
            </div>
            <Droppable droppableId={category} direction="vertical">
              {(provided) => (
                <div
                  className="h-full flex flex-col gap-5 mb-4"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {bookmarks.map((bookmark, bookmarkIdx) => (
                    <DragItem
                      bookmark={bookmark}
                      idx={bookmarkIdx}
                      key={bookmark.orderIdx}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      )}
    </Draggable>
  )
}

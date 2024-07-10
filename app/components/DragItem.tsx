import { Draggable } from '@hello-pangea/dnd'

import { GetBookmarksResponse } from '@/app/types/api'
import BookmarkItem from '@/app/bookmarks/components/BookmarkItem'

export default function DragItem({
  bookmark,
  idx,
}: {
  bookmark: GetBookmarksResponse
  idx: number
}) {
  return (
    <Draggable draggableId={`${bookmark.id}`} index={idx}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <BookmarkItem
            key={bookmark.id}
            id={bookmark.id}
            title={bookmark.title}
            url={bookmark.url}
            tags={bookmark.tags}
          />
        </div>
      )}
    </Draggable>
  )
}

/**
 * export const authorQuoteMap: QuoteMap = authors.reduce(
  (previous: QuoteMap, author: Author) => ({
    ...previous,
    [author.name]: getByAuthor(author, quotes),
  }),
  {},
);

 */

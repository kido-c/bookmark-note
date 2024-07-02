'use client'

import { useForm } from 'react-hook-form'
import axios from 'axios'

import { GetBookmarkResponse } from '@/app/types/api'
import { formatDate } from '@/app/utils/fomatDate'
import { revalidateBookmarks } from '@/app/lib/action'

interface Props {
  defaultValues: GetBookmarkResponse
}

interface FormData
  extends Omit<
    GetBookmarkResponse,
    'tags' | 'updatedAt' | 'createdAt' | 'userId' | 'id' | 'categoryId'
  > {}

export default function BookmarkForm({ defaultValues }: Props) {
  const { register, handleSubmit } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    if (
      data.category.name === defaultValues.category.name &&
      data.description === defaultValues.description &&
      data.title === defaultValues.title
    ) {
      return alert('수정된 내용이 없습니다.')
    }
    const response = await axios.patch(
      `${process.env.API_END_POINT}/bookmarks/${defaultValues.id}`,
      data
    )

    if (response.status === 200) {
      revalidateBookmarks()
      alert('수정이 완료되었습니다.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section className="flex flex-col gap-4">
        <div>
          <span className="text-slate-400">Title : </span>
          <input
            {...register('title')}
            className="pl-3"
            defaultValue={defaultValues.title}
          />
        </div>

        <div>
          <span className="text-slate-400">Update Date : </span>
          <input
            className="pl-3"
            disabled
            defaultValue={formatDate(defaultValues.updatedAt)}
          />
        </div>
        <div className="flex justify-start items-center gap-3">
          <span className="text-slate-400">Tags : </span>
          <div className="flex gap-2">
            {defaultValues.tags.map((tag) => (
              <div
                className={`rounded-3xl px-2 text-[10px]`}
                style={{ backgroundColor: tag.bgColor, color: tag.textColor }}
                key={tag.id}
              >
                <span>{tag.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <span className="text-slate-400">Category : </span>
          <input
            {...register('category.name')}
            className="pl-3"
            defaultValue={defaultValues.category.name}
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-slate-400">Description : </span>
          <textarea
            {...register('description')}
            className="w-4/5 h-56 p-2 rounded-lg"
          >
            {defaultValues.description}
          </textarea>
        </div>
      </section>
      <button type="submit">제출이요</button>
    </form>
  )
}

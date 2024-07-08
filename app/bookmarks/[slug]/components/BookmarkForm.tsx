'use client'

import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/navigation'

import { GetBookmarkResponse } from '@/app/types/api'
import { formatDate } from '@/app/utils/fomatDate'
import { revalidateBookmarks } from '@/app/lib/action'
import Button from '@/app/components/Button'

interface Props {
  defaultValues: GetBookmarkResponse
}

interface FormData
  extends Omit<
    GetBookmarkResponse,
    'tags' | 'updatedAt' | 'createdAt' | 'userId' | 'id' | 'categoryId'
  > {}

export default function BookmarkForm({ defaultValues }: Props) {
  const router = useRouter()
  const { register, handleSubmit } = useForm<FormData>()

  const goToBack = () => {
    router.back()
  }

  const onSubmit = async (data: FormData) => {
    if (
      data.category.name === defaultValues.category.name &&
      data.description === defaultValues.description &&
      data.title === defaultValues.title
    ) {
      return alert('수정된 내용이 없습니다.')
    }

    axios
      .patch(`/api/bookmarks/${defaultValues.id}`, data)
      .then(() => {
        revalidateBookmarks()
        alert('수정이 완료되었습니다.')
      })
      .catch(() => {
        alert('수정에 실패했습니다.')
      })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full h-full flex flex-col justify-between"
    >
      <section className="flex flex-col gap-4 w-full">
        <div className="h-8 flex items-center">
          <span className="text-slate-400 font-bold">Title : </span>
          <input
            {...register('title')}
            className="pl-3 ml-3 h-8 border border-slate-300"
            defaultValue={defaultValues.title}
          />
        </div>
        <div className="h-8 flex items-center">
          <span className="text-slate-400 font-bold">Update Date : </span>
          <input
            className=" ml-3"
            disabled
            defaultValue={formatDate(defaultValues.updatedAt)}
          />
        </div>
        <div className="h-8 flex justify-start items-center gap-3">
          <span className="text-slate-400 font-bold">Tags : </span>
          <div className="flex gap-2">
            {defaultValues.tags.map((tag) => (
              <div
                className={`rounded-3xl px-4 py-1 text-[12px]`}
                style={{ backgroundColor: tag.bgColor, color: tag.textColor }}
                key={tag.id}
              >
                <span>{tag.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="h-8 flex items-center">
          <span className="text-slate-400 font-bold">Category : </span>
          <input
            {...register('category.name')}
            className="pl-3 ml-3 h-8 border border-slate-300"
            defaultValue={defaultValues.category.name}
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-slate-400 font-bold">Description : </span>
          <textarea
            {...register('description')}
            className=" h-64 p-2 rounded-lg"
            defaultValue={defaultValues.description || ''}
          />
        </div>
      </section>
      <section className="">
        <Button type="submit" style="active" title="수정" />
        <Button style="border" handleClick={goToBack} title="취소" />
      </section>
    </form>
  )
}

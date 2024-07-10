export interface Bookmark {
  id: number
  title: string
  category: Category
  tags: Tag[]
  description: string
  url: string
}

export interface Tag {
  id: number
  name: string
  textColor: string
  bgColor: string
}

export interface Category {
  id: number
  name: string
  orderIdx: number
}

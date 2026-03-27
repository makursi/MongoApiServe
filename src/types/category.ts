import type { Document, Types } from 'mongoose'

export interface ICategoryDocument extends Document {
  _id: Types.ObjectId
  name: string
  slug: string
  description?: string
  parentCategory?: Types.ObjectId
  order: number
  createdAt: Date
  updatedAt: Date
}

export interface CategoryPublicInfo {
  categoryId: string
  name: string
  slug: string
  description?: string
  order: number
}

export interface CategoryTree extends CategoryPublicInfo {
  children?: CategoryTree[]
}

export interface CreateCategoryInput {
  name: string
  slug: string
  description?: string
  parentCategory?: string
  order?: number
}

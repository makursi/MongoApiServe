import type { Document, Types } from 'mongoose'

export interface ITagDocument extends Document {
  _id: Types.ObjectId
  name: string
  slug: string
  color?: string
  postCount: number
  createdAt: Date
  updatedAt: Date
}

export interface TagPublicInfo {
  tagId: string
  name: string
  slug: string
  color?: string
}

export interface CreateTagInput {
  name: string
  slug: string
  color?: string
}

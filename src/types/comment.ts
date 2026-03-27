import type { Document, Types } from 'mongoose'

export interface ICommentDocument extends Document {
  _id: Types.ObjectId
  post: Types.ObjectId
  author: Types.ObjectId
  content: string
  parentComment?: Types.ObjectId
  isDeleted: boolean
  createdAt: Date
  updatedAt: Date
}

export interface CommentPublicInfo {
  commentId: string
  author: {
    userId: string
    username: string
    avatar?: string
  }
  content: string
  createdAt: string
  replies?: CommentPublicInfo[]
}

export interface CreateCommentInput {
  postId: string
  content: string
  parentCommentId?: string
}

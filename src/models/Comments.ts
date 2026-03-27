import type { ICommentDocument } from '../types/comment'
import mongoose, { Schema } from 'mongoose'

const commentSchema = new Schema<ICommentDocument>(
  {
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: [true, '文章 ID 不能为空'],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, '作者 ID 不能为空'],
    },
    content: {
      type: String,
      required: [true, '评论内容不能为空'],
      trim: true,
      maxlength: [1000, '评论最多 1000 字符'],
    },
    parentComment: {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

// 索引
commentSchema.index({ post: 1, createdAt: -1 })

const Comment = mongoose.model<ICommentDocument>('Comment', commentSchema)

export default Comment

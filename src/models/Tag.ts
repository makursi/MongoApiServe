import type { ITagDocument } from '../types/tag'
import mongoose, { Schema } from 'mongoose'

const tagSchema = new Schema<ITagDocument>(
  {
    name: {
      type: String,
      required: [true, '标签名称不能为空'],
      unique: true,
      trim: true,
      maxlength: [20, '标签名称最多 20 字符'],
    },
    slug: {
      type: String,
      required: [true, '标签 slug 不能为空'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    color: {
      type: String,
      default: '#007bff',
    },
    postCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

const Tag = mongoose.model<ITagDocument>('Tag', tagSchema)

export default Tag

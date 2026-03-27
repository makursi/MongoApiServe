import type { ICategoryDocument } from '../types/category'
import mongoose, { Schema } from 'mongoose'

const categorySchema = new Schema<ICategoryDocument>(
  {
    name: {
      type: String,
      required: [true, '分类名称不能为空'],
      unique: true,
      trim: true,
      maxlength: [30, '分类名称最多 30 字符'],
    },
    slug: {
      type: String,
      required: [true, '分类 slug 不能为空'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      maxlength: [200, '描述最多 200 字符'],
    },
    parentCategory: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

const Category = mongoose.model<ICategoryDocument>('Category', categorySchema)

export default Category

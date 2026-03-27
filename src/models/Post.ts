import type { IPostModel } from '../interfaces/IPost'
import type { IPostDocument } from '../types/post'
import mongoose, { Schema } from 'mongoose'

const postSchema = new Schema<IPostDocument>(
  {
    title: {
      type: String,
      required: [true, '标题不能为空'],
      trim: true,
      maxlength: [100, '标题最多 100 字符'],
    },
    content: {
      type: String,
      required: [true, '内容不能为空'],
    },
    excerpt: {
      type: String,
      maxlength: [200, '摘要最多 200 字符'],
    },
    slug: {
      type: String,
      required: [true, 'slug 不能为空'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    coverImage: {
      type: String,
      default: '',
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, '作者不能为空'],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tag',
      },
    ],

    // 识别为了String constructor类型
    status: {
      type: String as any,
      enum: ['draft', 'published'],
      default: 'draft',
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    commentCount: {
      type: Number,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
)

// 索引
// postSchema.index({ slug: 1 });
postSchema.index({ createdAt: -1 })
postSchema.index({ status: 1, createdAt: -1 })

// 静态方法：查找已发布的文章
postSchema.statics.findPublished = async function (query: any = {}) {
  return this.find({ ...query, status: 'published', isDeleted: false })
  // 作用：文章通常只存了作者的 ID（引用）。
  // populate 会自动去 User 表把作者信息查出来，替换掉 ID。
  // 替换author 的ID
  // 第二个参数：'username avatar' 表示只获取作者的用户名和头像，不获取密码等其他敏感信息。
    .populate('author', 'username avatar')
    .populate('category', 'name slug')
    .populate('tags', 'name slug')
    .sort({ createdAt: -1 })
}

// 静态方法：按 slug 查找
postSchema.statics.findBySlug = async function (slug: string) {
  return this.findOne({ slug, isDeleted: false })
    .populate('author', 'username avatar email')
    .populate('category', 'name slug')
    .populate('tags', 'name slug')
}

// 静态方法：增加阅读数
postSchema.statics.incrementViewCount = async function (id: string) {
  await this.findByIdAndUpdate(id, { $inc: { viewCount: 1 } })
}

const Post = mongoose.model<IPostDocument, IPostModel>('Post', postSchema)

export default Post

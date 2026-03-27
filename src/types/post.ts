import type { Document, Types } from 'mongoose'

// 文章枚举类型

export enum PostStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
}

export interface IPostDocument extends Document {
  // Types.ObjectId 是 Mongoose 提供的特定类型，是文档主键
  // 对应数据库中 24 位十六进制字符串生成的唯一标识符。
  _id: Types.ObjectId
  title: string
  content: string
  // 文章摘要或简介。
  excerpt?: string
  // 含义：URL 友好型标识符（ permalink）。
  slug: string
  // 含义：封面图片的 URL 或文件路径。
  coverImage?: string

  // 关联关系字段
  // 这些字段存储的是其他集合文档的 _id，
  // 体现了 MongoDB 中的引用（Reference）关系
  author: Types.ObjectId
  category?: Types.ObjectId
  tags: Types.ObjectId[]
  status: PostStatus
  // 含义：浏览量/阅读数。
  viewCount: number
  // 点赞数
  likeCount: number
  // 评论数
  commentCount: number
  isDeleted: boolean
  publishedAt?: Date
  createdAt: Date
  updatedAt: Date
}

// 文章摘要

// DTO (Data Transfer Object，数据传输对象) 或 ViewModel。
// 核心目的是：将“数据库存储结构”与“前端展示需求”解耦
// 只传输前端页面（如文章列表页、卡片流）所需的最小数据集。
export interface PostSummary {
  postId: string
  title: string
  excerpt?: string
  slug: string
  coverImage?: string
  // 这意味着数据在返回给前端之前，已经完成了 Population（关联查询） 或 Join（连接） 操作。
  // 前端拿到数据可以直接显示作者名，无需再发起一次请求去查用户表。
  author: {
    userId: string
    username: string
  }
  category?: {
    categoryId: string
    name: string
  }
  tags: Array<{
    tagId: string
    name: string
  }>
  viewCount: number
  isPublished: boolean
  // 注意这里是 string（通常是 ISO 8601 格式
  // 方便前端直接渲染或使用时区库（如 day.js）处理
  publishedAt: string
}

// 创建文章输入
export interface CreatePostInput {
  title: string
  content: string
  excerpt?: string
  category?: string
  tags?: string[]
  coverImage?: string
  isPublished?: boolean
}

// 更新文章输入
export type UpdatePostInput = Partial<CreatePostInput>

// 文章查询参数
export interface PostQueryParams {
  page?: number
  limit?: number
  category?: string
  tag?: string
  author?: string
  status?: PostStatus
  search?: string
  sortBy?: 'createdAt' | 'updatedAt' | 'viewCount'
  sortOrder?: 'asc' | 'desc'
}

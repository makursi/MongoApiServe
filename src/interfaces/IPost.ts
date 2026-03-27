import type { Model } from 'mongoose'
import type { PaginatedResult } from '../types/common'
import type { CreatePostInput, IPostDocument, PostQueryParams } from '../types/post'

// 文章模型静态方法接口

export interface IPostModel extends Model<IPostDocument> {

  findPublished: (query?: PostQueryParams) => Promise<PaginatedResult<IPostDocument>>

  findBySlug: (slug: string) => Promise<IPostDocument | null>

  incrementViewCount: (id: string) => Promise<void>

}

// 文章服务接口
export interface IPostService {
  create: (data: CreatePostInput, authorId: string) => Promise<IPostDocument>

  findByID: (id: string) => Promise<IPostDocument | null>

  findBySlug: (slug: string) => Promise<IPostDocument | null>

  findAll: (query: PostQueryParams) => Promise<PaginatedResult<IPostDocument>>

  update: (id: string, data: Partial<CreatePostInput>) => Promise<IPostDocument | null>

  delete: (id: string) => Promise<boolean>
}

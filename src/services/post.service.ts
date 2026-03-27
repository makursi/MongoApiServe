import type { PaginatedResult } from '../types/common'
import type { CreatePostInput, IPostDocument, PostQueryParams } from '../types/post'
import { Types } from 'mongoose'
import Post from '../models/Post'

export class PostService {
// 创建文章
  async create(data: CreatePostInput, authorId: string): Promise<IPostDocument> {
    const slug = this.generateSlug(data.title)

    const post = await Post.create({
      ...data,
      slug,
      author: new Types.ObjectId(authorId),
      status: data.isPublished ? 'published' : 'draft',
      publishedAt: data.isPublished ? new Date() : undefined,
    })

    return post
  }

  /**
   * 按 ID 查找文章
   */
  async findById(id: string): Promise<IPostDocument | null> {
    return Post.findById(id)
      .populate('author', 'username avatar')
      .populate('category', 'name slug')
      .populate('tags', 'name slug')
  }

  // 按slug 查找文章
  async findBySlug(slug: string): Promise<IPostDocument | null> {
    return Post.findBySlug(slug)
  }

  // 获取文章列表

  async findAll(query: PostQueryParams): Promise<PaginatedResult<IPostDocument>> {
    const page = query.page || 1
    const limit = query.limit || 10
    const skip = (page - 1) * limit

    // 构建查询条件
    // 目的：这是一个软删除的保护机制。意味着无论用户怎么查
    // 我们永远只查没被删除的文章，被标记为删除的文章默认不显示。
    const filter: any = { isDeleted: false }

    if (query.status) {
      filter.status = query.status
    }
    if (query.category) {
      filter.category = new Types.ObjectId(query.category)
    }
    if (query.author) {
      filter.author = new Types.ObjectId(query.author)
    }

    // 搜索
    // 模糊查询, $or 是 MongoDB 的逻辑操作符，代表“或”的关系
    if (query.search) {
      filter.$or = [
        { title: { $regex: query.search, $options: 'i' } },
        { content: { $regex: query.search, $options: 'i' } },
      ]
    }

    // 执行查询
    // 核心任务是：根据筛选条件，
    // 从数据库里“切”出当前这一页的数据，并计算出总共有多少页，最后打包返回给前端。

    // 使用了 Promise.all，这是一个性能优化的关键点。
    // 它同时发起两个数据库操作，而不是等一个做完再做另一个
    const [posts, total] = await Promise.all([
      Post.find(filter)
      // .populate(...) (联表查询)

        // 把文章里的 author ID 替换成具体的用户对象，
        // 但只取 username 和 avatar 字段（不取密码等敏感信息）。
        .populate('author', 'username avatar')
        // .populate('category', 'name slug')：把 category ID 替换成分类详情（名称、别名）。
        .populate('category', 'name slug')
        // .populate('tags', 'name slug')：把 tags ID 数组替换成标签详情数组。
        .populate('tags', 'name slug')
        // 动态排序：这是一个非常灵活的写法。
        // 如果用户传了 sortBy=views，就按浏览量排；没传就默认按 createdAt（创建时间）排。
        // 如果用户传了 sortOrder=asc，就正序；没传就默认 desc（倒序，最新的在最前面）。
        .sort({ [query.sortBy || 'createdAt']: query.sortOrder || 'desc' })
        // 分页核心：
        // limit：告诉数据库“这一页只要 10 条”。
        // skip：告诉数据库“跳过前 20 条”（假设你在第 3 页，每页 10 条）。
        .skip(skip)
        .limit(limit),
      // 任务 B：查询符合条件的文章总数 (Post.countDocuments(filter))

      // 这个总数不是用来给前端展示的列表，而是用来计算总页数的。
      Post.countDocuments(filter),
    ])
    return {
      // 当前页的文章数组。
      items: posts,
      pagination: {
        // 告诉前端当前是第几页。
        currentPage: page,
        // Math.ceil 是向上取整。
        // 如果有 105 篇文章，每页 10 条。105 / 10 = 10.5。
        // 向上取整后是 11 页。前端就知道最多只能点到第 11 页。
        totalPages: Math.ceil(total / limit),
        // totalItems: total：总共有多少篇文章（比如 105 篇）
        totalItems: total,
        // itemsPerPage: limit：每页显示多少条（比如 10 条）。
        itemsPerPage: limit,
      },
    }
  }

  // 更新文章
  async update(
    id: string,
    data: Partial<CreatePostInput>,
  ): Promise<IPostDocument | null> {
    const updateData: any = { ...data }

    // 如果发布状态改变，更新 publishedAt
    if (data.isPublished !== undefined) {
      updateData.status = data.isPublished ? 'published' : 'draft'
      if (data.isPublished) {
        updateData.publishedAt = new Date()
      }
    }
    return Post.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })
  }

  /**
   * 删除文章（软删除）
   */
  async delete(id: string): Promise<boolean> {
    const result = await Post.findByIdAndUpdate(id, { isDeleted: true })
    return !!result
  }

  /**
   * 增加阅读数
   */
  async incrementViewCount(id: string): Promise<void> {
    await Post.incrementViewCount(id)
  }

  /**
   * 生成 slug
   */
  private generateSlug(title: string): string {
    return `${title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()}-${Date.now()}`
  }
}

export const postService = new PostService()

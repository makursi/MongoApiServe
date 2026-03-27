import type { Request, Response } from 'express'
import type { ApiResponse, PaginatedResult } from '../types/common'
import type { IPostDocument } from '../types/post'
import asyncHandler from '../errors/asyncHandler'
import { postService } from '../services/post.service'
import { PostSummary } from '../types/post'

/**
 * 创建文章
 */
export const createPost = asyncHandler(async (req: Request, res: Response) => {
  const post = await postService.create(req.body, req.user!._id.toString())

  res.status(201).json({
    success: true,
    message: '文章创建成功',
    data: {
      postId: post._id,
      title: post.title,
      slug: post.slug,
      isPublished: post.status === 'published',
    },
  } as ApiResponse)
})

/**
 * 获取文章列表
 */
export const getPosts = asyncHandler(async (req: Request, res: Response) => {
  const query = {
    page: Number.parseInt(req.query.page as string) || 1,
    limit: Number.parseInt(req.query.limit as string) || 10,
    category: req.query.category as string,
    tag: req.query.tag as string,
    author: req.query.author as string,
    status: req.query.status as 'draft' | 'published',
    search: req.query.search as string,
    sortBy: req.query.sortBy as 'createdAt' | 'updatedAt' | 'viewCount',
    sortOrder: req.query.sortOrder as 'asc' | 'desc',
  }

  const result = await postService.findAll(query)

  res.status(200).json({
    success: true,
    data: result,
  } as ApiResponse<PaginatedResult<IPostDocument>>)
})

/**
 * 获取文章详情
 */
export const getPost = asyncHandler(async (req: Request, res: Response) => {
  const { slug } = req.params

  const post = await postService.findBySlug(slug as string)

  if (!post) {
    res.status(404).json({
      success: false,
      message: '文章不存在',
    } as ApiResponse)
    return
  }

  // 增加阅读数
  await postService.incrementViewCount(post._id.toString())

  res.status(200).json({
    success: true,
    data: post,
  } as ApiResponse)
})

/**
 * 更新文章
 */
export const updatePost = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params

  const post = await postService.update(id as string, req.body)

  if (!post) {
    res.status(404).json({
      success: false,
      message: '文章不存在',
    } as ApiResponse)
    return
  }

  res.status(200).json({
    success: true,
    message: '文章更新成功',
    data: post,
  } as ApiResponse)
})

/**
 * 删除文章
 */
export const deletePost = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params

  const success = await postService.delete(id as string)

  if (!success) {
    res.status(404).json({
      success: false,
      message: '文章不存在',
    } as ApiResponse)
    return
  }

  res.status(200).json({
    success: true,
    message: '文章删除成功',
  } as ApiResponse)
})

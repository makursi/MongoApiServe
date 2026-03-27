import { Router } from 'express'
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from '../controllers/post.controller'
import { protect } from '../middleware/auth.middleware'
import { validate } from '../middleware/validation.middleware'
import {
  createPostSchema,
  postIdParamsSchema,
  postQuerySchema,
  updatePostSchema,
} from '../validators/post.validator'

const router = Router()

// 公开路由
router.get('/', validate(postQuerySchema), getPosts)
router.get('/:slug', getPost)

// 受保护路由
router.post('/', protect, validate(createPostSchema), createPost)
router.put('/:id', protect, validate(postIdParamsSchema), validate(updatePostSchema), updatePost)
router.delete('/:id', protect, validate(postIdParamsSchema), deletePost)

export default router

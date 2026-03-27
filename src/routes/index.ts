import { Router } from 'express'
import authRoutes from './auth.routes'
import postRoutes from './post.routes'
import userRoutes from './user.routes'

const router = Router()

// 注册路由
router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/posts', postRoutes)

export default router

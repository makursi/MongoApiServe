import { Router } from 'express'
import { getProfile, updateProfile } from '../controllers/user.controller'
import { protect } from '../middleware/auth.middleware'
import { validate } from '../middleware/validation.middleware'
import { updateProfileSchema } from '../validators/user.validator'

const router = Router()

// 受保护路由
router.get('/profile', protect, getProfile)
router.put('/profile', protect, validate(updateProfileSchema), updateProfile)

export default router

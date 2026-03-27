import { Router } from 'express'
import { login, register } from '../controllers/user.controller'
import { authLimiter } from '../middleware/rateLimiter.middleware'
import { validate } from '../middleware/validation.middleware'
import { loginSchema, registerSchema } from '../validators/user.validator'

const router = Router()

// 用户注册
router.post('/register', authLimiter, validate(registerSchema), register)

// 用户登录
router.post('/login', authLimiter, validate(loginSchema), login)

export default router

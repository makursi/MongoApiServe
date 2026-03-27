import rateLimit from 'express-rate-limit'

/**
 * 通用限流器 - 每分钟最多 100 次请求
 */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 分钟
  max: 100, // 每个 IP 最多 100 次请求
  message: {
    success: false,
    message: '请求过于频繁，请稍后再试',
  },
  standardHeaders: true,
  legacyHeaders: false,
})

/**
 * 严格限流器 - 用于认证相关接口
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 分钟
  max: 5, // 每个 IP 最多 5 次请求
  message: {
    success: false,
    message: '尝试次数过多，请稍后再试',
  },
  standardHeaders: true,
  legacyHeaders: false,
})

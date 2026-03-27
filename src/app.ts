import type { Application } from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { errorHandler, notFoundHandler } from './middleware/error.middleware'
import { apiLimiter } from './middleware/rateLimiter.middleware'
import routes from './routes'

// 加载环境变量
dotenv.config()

// ES Module __dirname polyfill
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 创建 Express 应用
const app: Application = express()

// 中间件配置
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 应用限流
app.use('/api', apiLimiter)

// 静态文件服务
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')))

// 注册路由
app.use('/api', routes)

// 健康检查
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: '服务运行正常',
    timestamp: new Date().toISOString(),
  })
})

// 404 处理
app.use(notFoundHandler)

// 全局错误处理
app.use(errorHandler)

export default app

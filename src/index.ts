import app from './app'
import connectDB from './config/database'
import logger from './utils/logger'

// 程序的入口文件

// 连接数据库
connectDB()

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`)
  console.log(`🚀 服务器已启动:http://localhost:${PORT}`)
  console.log(`📝 健康检查:http://localhost:${PORT}/health`)
})

import dotenv from 'dotenv'
import mongoose from 'mongoose'
import logger from '../utils/logger'

dotenv.config()

/**
 * 连接 MongoDB 数据库
 * @returns Promise<void>
 */
async function connectDB(): Promise<void> {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_BASE_URL as string)

    logger.info(`✅ 数据库连接成功：${conn.connection.host}`)
    console.log(`📦 数据库已连接:mongodb://${conn.connection.host}:${conn.connection.port}/${conn.connection.name}`)

    // 监听连接事件
    mongoose.connection.on('disconnected', () => {
      logger.warn('⚠️  数据库连接断开')
    })

    mongoose.connection.on('error', (err) => {
      logger.error(`❌ 数据库错误：${err.message}`)
    })
  }
  catch (error: any) {
    logger.error(`❌ 数据库连接失败：${error.message}`)
    console.error(`数据库连接错误：${error.message}`)
    process.exit(1)
  }
}

export default connectDB

import express from 'express'
import connectDB from './config/db.config.js'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import userRouter from './routes/users.js'
import postRouter from './routes/post.js'
//配置端口和express应用
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config()
//链接数据库
connectDB()
//cors解决跨域问题
const app = express()
app.use(cors())


// 解析请求体中的json数据的中间件
app.use(express.json())

// 导入路由模块


// 挂载路由到应用实例上
app.use('/api', userRouter)
app.use('/api/posts',postRouter)

app.use('/uploads',express.static(path.join(__dirname,'public/upload')))
const PORT = process.env.PORT
// 启动服务器
app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`)
})


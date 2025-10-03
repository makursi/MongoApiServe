import express from 'express'
import bodyParser from 'body-parser'
//配置端口和express应用
const app = express()
const port = 3000

// 中间件
// 解析请求体中的json数据的中间件
app.use(express.json())

app.use(bodyParser.urlencoded({ extended: true }));
// 导入路由模块
import userRouter from './routes/users.js'


// 挂载路由到应用实例上
app.use('/api/users', userRouter)

// 启动服务器
app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`)
})


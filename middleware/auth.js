import jwt from 'jsonwebtoken'
//使用中间件函数保护路由， 确保只有携带有效的JWT的请求才能访问
import { jwtConfig } from '../JWT/config'


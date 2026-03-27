// 1. 引入 Express 框架的核心类型定义
// Request: 代表 HTTP 请求对象，包含前端传来的参数 (body, params, query 等)
// Response: 代表 HTTP 响应对象，用来给前端发送数据 (json, status 等)
import type { Request, Response } from 'express'

// 3. 引入通用 API 响应类型
// ApiResponse: 这通常是一个接口定义，用来规范后端返回给前端的数据结构
// 比如规定所有接口返回的数据都必须包含 code, message, data 等字段
import type { ApiResponse } from '../types/common'

// 4. 引入用户相关的类型定义
// UserPublicInfo: 这是一个接口，定义了“用户公开信息”的数据结构
// 用来区分数据库里的完整用户信息（含密码）和返回给前端的公开信息（不含密码）
import type { UserPublicInfo } from '../types/user'

// 5. 引入异步错误处理工具
// asyncHandler: 这是一个高阶函数（包装器）
// 它的作用是自动捕获异步函数中的错误，避免在每个 controller 函数里都写 try...catch
import asyncHandler from '../errors/asyncHandler'

// 2. 引入用户服务层
// userService: 这是一个单例对象或类，里面封装了具体的用户业务逻辑
// 控制器不直接操作数据库，而是调用这里的函数来处理业务
import { userService } from '../services/user.service'

// 用户注册
export const register = asyncHandler(async (req: Request, res: Response) => {
  const user = await userService.register(req.body)

  res.status(201).json({
    success: true,
    message: '用户注册成功',
    data: {
      userId: user._id,
      username: user.username,
      email: user.email,
    },
  } as ApiResponse)
})

/**
 * 用户登录
 */
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { user, token } = await userService.login(req.body)

  res.status(200).json({
    success: true,
    message: '登录成功',
    data: {
      token,
      user: {
        userId: user._id.toString(),
        username: user.username,
        email: user.email,
        role: user.role,
        nickname: user.nickname,
        avatar: user.avatar,
        createdAt: user.createdAt.toISOString(), // 转换为 ISO 字符串
        updatedAt: user.updatedAt.toISOString(),
      } as UserPublicInfo,
    },
  } as ApiResponse)
})

// 获取当前用户信息
export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user

  res.status(200).json({
    success: true,
    data: {
      userId: user?._id.toString(),
      username: user?.username,
      email: user?.email,
      nickname: user?.nickname,
      avatar: user?.avatar,
      role: user?.role,
    } as UserPublicInfo,
  } as ApiResponse)
})

// 更新用户信息
export const updateProfile = asyncHandler(async (req: Request, res: Response) => {
  const user = await userService.updateUser(req.user!._id.toString(), req.body)
  res.status(200).json({
    success: true,
    message: '个人资料更新成功',
    data: {
      userId: user?._id,
      username: user?.username,
      email: user?.email,
      nickname: user?.nickname,
      avatar: user?.avatar,
    },
  } as ApiResponse)
})

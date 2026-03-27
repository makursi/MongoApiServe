import type { NextFunction, Request, Response } from 'express'
import type { IUserDocument } from '../types/user'
import jwt from 'jsonwebtoken'
import { jwtConfig } from '../config/jwt'
import User from '../models/User'

// 扩展 Express Request 类型
declare global {
  namespace Express {
    interface Request {
      user?: IUserDocument
    }
  }
}

/**
 * 认证中间件 - 验证 JWT token
 */
export async function protect(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    let token: string | undefined

    // 从 Authorization header 获取 token
    if (
      req.headers.authorization
      && req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
      res.status(401).json({
        success: false,
        message: '未授权，请登录后再试',
      })
      return
    }

    // 验证 token
    const decoded = jwt.verify(token, jwtConfig.SECRET_KEY) as { user: { id: string } }

    // 获取用户信息（排除密码）
    const user = await User.findById(decoded.user.id).select('-password')

    if (!user) {
      res.status(401).json({
        success: false,
        message: '用户不存在',
      })
      return
    }

    req.user = user
    next()
  }
  catch (error: any) {
    if (error.name === 'JsonWebTokenError') {
      res.status(401).json({
        success: false,
        message: '无效的 token',
      })
    }
    else if (error.name === 'TokenExpiredError') {
      res.status(401).json({
        success: false,
        message: 'token 已过期',
      })
    }
    else {
      res.status(500).json({
        success: false,
        message: '服务器错误',
      })
    }
  }
}

/**
 * 管理员授权中间件
 */
export function authorizeAdmin(req: Request, res: Response, next: NextFunction): void {
  if (!req.user || req.user.role !== 'admin') {
    res.status(403).json({
      success: false,
      message: '权限不足，需要管理员权限',
    })
    return
  }
  next()
}

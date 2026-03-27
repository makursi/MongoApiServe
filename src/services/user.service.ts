import type { IUserDocument, LoginInput, RegisterInput } from '../types'

import jwt from 'jsonwebtoken'

import { jwtConfig } from '../config/jwt'

import User from '../models/User'

export class UserService {
  // 用户注册
  async register(data: RegisterInput): Promise<IUserDocument> {
    // 用户简单是非判断
    const existingUser = await User.findOne({
      $or: [{ email: data.email }, { username: data.username }],
    })

    if (existingUser) {
      throw new Error(
        existingUser.email === data.email ? '邮箱已被注册' : '用户名已被使用',
      )
    }

    // 创建用户
    const user = await User.create(data)
    return user
  }

  // 用户登录
  async login(credentials: LoginInput): Promise<{ user: IUserDocument, token: string }> {
    const user = await User.findByEmail(credentials.email)

    if (!user) {
      throw new Error('邮箱或密码错误')
    }

    // 验证密码
    const isMatch = await user.comparePassword(credentials.password)

    if (!isMatch) {
      throw new Error('邮箱或密码错误')
    }

    // 用户登出

    // 生成JWT token

    const token = jwt.sign({ user: { id: user._id } }, jwtConfig.SECRET_KEY, { expiresIn: jwtConfig.TOKEN_EXPIRES_IN })

    return { user, token }
  }

  // 获取用户信息
  async getUserById(id: string): Promise<IUserDocument | null> {
    return User.findById(id)
  }

  // 更新用户信息
  async updateUser(id: string, data: Partial<IUserDocument>): Promise<IUserDocument | null> {
    return User.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).select('-password')
  }

  // 删除用户
  async deleteUser(id: string): Promise<boolean> {
    const result = await User.findByIdAndDelete(id)
    return !!result
  }
}
export const userService = new UserService()

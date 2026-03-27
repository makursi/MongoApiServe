import type { Document, Types } from 'mongoose'

// 定义管理员和用户的枚举值

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

// 用户文档接口类型定义
export interface IUserDocument extends Document {
  _id: Types.ObjectId
  username: string
  //  密码的本质是任意字符序列，而不仅仅是数字。使用number类型容易被密码攻破
  email: string
  password: string
  nickname?: string
  // 个人头像
  avatar?: string
  // 个人简介
  bio?: string
  role: UserRole
  // 是否认证
  isVerified: boolean
  // 最后一次日志的时间
  lastLoginAt?: Date
  createdAt: Date
  updatedAt: Date

  // 实例方法
  comparePassword: (candidatePassword: string) => Promise<boolean>
}

// 用户公开信息返回给客户端
export interface UserPublicInfo {
  userId: string
  username: string
  email: string
  nickname?: string
  avatar?: string
  role: UserRole
  createdAt: string
  updatedAt: string
}

// 用户注册输入
export interface RegisterInput {
  username: string
  email: string
  password: string
  nickname?: string
}

// 用户登录输入
export interface LoginInput {
  email: string
  password: string
}

// 更新用户资料输入
export interface UpdateProfileInput {
  nickname?: string
  avatar?: string
  bio?: string
}

// 修改密码输入
export interface ChangePasswordInput {
  oldPassword: string
  newPassword: string
}

import type { Model } from 'mongoose'

import type { IUserDocument, LoginInput, RegisterInput } from '../types/user'

// 用户模型静态方法接口
// IUserModel 继承 mongoose 的 Model 的实例方法
export interface IUserModel extends Model<IUserDocument> {
  // 1. 自定义静态查询方法
  findByEmail: (email: string) => Promise<IUserDocument | null>

  // 2. 自定义带验证的创建方法
  createWithValidation: (data: RegisterInput) => Promise<IUserDocument>

  // 3. 自定义认证逻辑方法
  verifyCredentials: (credentials: LoginInput) => Promise<IUserDocument | null>
}

// 用户服务接口

export interface IUserService {
  // 注册
  register: (data: RegisterInput) => Promise<IUserDocument>
  // 登录
  login: (credentials: LoginInput) => Promise<{ user: IUserDocument, token: string }>

  // 登出

  // 更新用户信息
  updateUser: (id: string, data: Partial<IUserDocument>) => Promise<IUserDocument | null>

  // 自定义用户查询方法
  getUserById: (id: string) => Promise<IUserDocument | null>

  // 管理员删除用户
  deleteUser: (id: string) => Promise<boolean>

}

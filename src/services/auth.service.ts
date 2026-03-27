import type { IUserDocument, LoginInput, RegisterInput } from '../types/user'
import { userService } from './user.service'

export class AuthService {
  // 用户注册

  async register(data: RegisterInput): Promise<{ user: IUserDocument, token: string }> {
    const user = await userService.register(data)

    // 自动生成token
    const token = await this.generateToken(user)

    return { user, token }
  }

  // 用户登录
  async login(credentials: LoginInput): Promise<{ user: IUserDocument, token: string }> {
    return userService.login(credentials)
  }

  // 生成JWT token
  private async generateToken(user: IUserDocument): Promise<string> {
    const jwt = await import('jsonwebtoken')
    const { jwtConfig } = await import('../config/jwt')
    return jwt.sign(
      { user: { id: user._id } },
      jwtConfig.SECRET_KEY,
      { expiresIn: jwtConfig.TOKEN_EXPIRES_IN },
    )
  }
}

export const authService = new AuthService()

import dotenv from 'dotenv'

dotenv.config()

/**
 * JWT 配置对象
 */
export const jwtConfig = {
  /**
   * JWT 密钥
   * 从环境变量读取，如果没有则使用默认值（仅开发环境）
   */
  SECRET_KEY: process.env.SECRET_KEY || 'dev_secret_key_change_in_production',

  /**
   * Token 过期时间
   * 默认 7 天
   */
  TOKEN_EXPIRES_IN: process.env.TOKEN_EXPIRES_IN || '7d',

  /**
   * Token 颁发者
   */
  ISSUER: 'user_center_api',

  /**
   * Token 受众
   */
  AUDIENCE: 'user_center_users',
}

/**
 * JWT 配置验证
 * 确保生产环境不使用默认密钥
 */
if (process.env.NODE_ENV === 'production'
  && process.env.SECRET_KEY === undefined) {
  console.warn('⚠️  警告：生产环境未设置 SECRET_KEY,请使用环境变量配置')
}

export default jwtConfig

import { z } from 'zod'

// 用户注册验证
export const registerSchema = z.object({

  body: z.object({
    username: z.string().min(3).max(20).regex(/^\w+$/),
    email: z.email('请输入正确的邮箱格式'),
    password: z.string().min(6).max(20).regex(/[a-z]/i).regex(/\d/),
    nickname: z.string().min(2).max(30).optional(),
  }),

})

// 用户登录验证
export const loginSchema = z.object({
  body: z.object({
    email: z.email('邮箱格式不正确'),
    password: z.string().min(1, '密码不能为空'),
  }),
})

// 更新用户资料验证
export const updateProfileSchema = z.object({
  body: z.object({
    bio: z.string().max(500).optional(),
    avatar: z.url('需有效的URL').optional(),
    nickname: z.string().min(2).max(30).optional(),
  }),
})

// 用户ID参数验证
export const userIdParamsSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-f]{24}$/i),
  }),
})
// export type UserIdParams = z.infer<typeof userIdParamsSchema>
// 会导出为 {id:string} 显得有点多余, 业务中只需要id 这个字符串

// 导出验证类型, 并immerse其中的body嵌套对象属性
export type RegisterInput = z.infer<typeof registerSchema>['body']

export type LoginInput = z.infer<typeof loginSchema>['body']

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>['body']

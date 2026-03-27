import type { IUserModel } from '../interfaces'
import type { IUserDocument, RegisterInput } from '../types/user'
import bcrypt from 'bcrypt'
import mongoose, { Schema } from 'mongoose'

// 定义user schema

const userSchema = new Schema<IUserDocument, IUserModel>(
  {
    username: {
      type: String,
      required: [true, '用户名不能为空'],
      unique: true,
      trim: true,
      minlength: [3, '用户名至少 3 个字符'],
      maxlength: [20, '用户名最多 20 个字符'],
    },
    email: {
      type: String,
      required: [true, '邮箱不能为空'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})$/, '邮箱格式不正确'],
    },
    password: {
      type: String,
      required: [true, '密码不能为空'],
      minlength: [6, '密码至少 6 个字符'],
      maxlength: [255, '密码最多 255 字符'],
      select: false,
    },
    nickname: {
      type: String,
      trim: true,
      minlength: [2, '昵称至少 2 个字符'],
      maxlength: [30, '昵称最多 30 字符'],
    },
    avatar: {
      type: String,
      default: '',
    },
    bio: {
      type: String,
      maxlength: [500, '个人简介最多 500 字符'],
    },
    role: {
      // type 字段期望接收的是类型本身（如 String），
      // 而不是它的构造函数类型（StringConstructor)
      type: String as any,
      enum: ['user', 'admin'],
      default: 'user',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    lastLoginAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
)

// 对密码进行加密
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  try {
    const saltRounds = 10
    this.password = await bcrypt.hash(this.password, saltRounds)
    next()
  }
  catch (error: any) {
    next(error)
  }
})

// 密码对比方法
userSchema.methods.comparePassword = async function (
  // 函数执行后,会返回Promise. 在解决resolve后,会得到一个布尔值
  // true: 表示用户输入的 candidatePassword 与数据库中存储的哈希密码 this.password 匹配。
  // false: 表示密码不匹配。
  candidatePassword: string,
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password)
}

// 静态方法->类 实例方法-> 通过类实例化的对象的方法
// 静态方法：按邮箱查找
userSchema.statics.findByEmail = async function (email: string) {
  return this.findOne({ email }).select('+password')
}

// 静态方法:创建用户（带验证）
userSchema.statics.createWithValidation = async function (data: RegisterInput) {
  return this.create(data)
}

// 静态方法: 验证凭证
userSchema.statics.verifyCredentials = async function (credentials: { email: string, password: string }) {
  const user = await this.findByEmail(credentials.email)
  if (!user)
    return null

  const isMatch = await user.comparePassword(credentials.password)
  return isMatch ? user : null
}

const User = mongoose.model<IUserDocument, IUserModel>('User', userSchema)

export default User

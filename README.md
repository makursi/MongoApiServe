# 博客 API 后端服务

一个基于 Node.js、Express 和 MongoDB 的全功能博客 API 后端服务，支持用户认证、文章管理、文件上传等功能。

## 项目简介

本项目是一个完整的博客 API 后端服务，提供用户认证、文章管理、文件上传等核心功能。项目采用现代 Web 开发技术栈，具有良好的安全性、可扩展性和可维护性。

**技术特点：**
- 🚀 基于 TypeScript，类型安全
- 🔐 JWT 身份认证与授权
- 📝 RESTful API 设计
- 🛡️ 完善的错误处理机制
- 📦 模块化架构设计
- 🔒 多重安全防护（限流、CORS、输入验证）

## 功能特性

- ✅ 用户注册、登录、登出功能
- ✅ JWT 身份认证与授权
- ✅ 用户信息管理（查询、更新、删除）
- ✅ 博客文章管理（增删改查）
- ✅ 文章图片上传功能
- ✅ 安全密码加密（bcrypt）
- ✅ 跨域资源共享（CORS）支持
- ✅ RESTful API 设计
- ✅ API 请求限流保护
- ✅ 统一错误处理
- ✅ 结构化日志记录

## 技术栈

- **运行时**: Node.js (v18+)
- **语言**: TypeScript 5.9+
- **Web 框架**: Express 5.1+
- **数据库**: MongoDB 6.0+
- **ODM**: Mongoose 8.17+
- **认证**: JWT (jsonwebtoken)
- **加密**: bcrypt
- **文件上传**: multer
- **验证**: Zod
- **限流**: express-rate-limit
- **开发工具**:
  - tsx (TypeScript 执行)
  - ESLint + Prettier (代码规范)
  - Nodemon (热重载)

## 项目结构

```
Mongo_api_server/
├── src/
│   ├── config/              # 配置文件
│   │   ├── database.ts      # 数据库连接配置
│   │   ├── jwt.ts           # JWT 配置
│   │   └── index.ts         # 配置导出
│   │
│   ├── controllers/         # 控制器层
│   │   ├── auth.controller.ts   # 认证控制器
│   │   ├── post.controller.ts   # 文章控制器
│   │   ├── user.controller.ts   # 用户控制器
│   │   └── index.ts
│   │
│   ├── errors/            # 错误处理
│   │   ├── AppError.ts    # 自定义错误类
│   │   ├── asyncHandler.ts # 异步错误包装器
│   │   └── index.ts
│   │
│   ├── interfaces/        # TypeScript 接口定义
│   │   ├── IPost.ts       # 文章接口
│   │   ├── IUser.ts       # 用户接口
│   │   └── index.ts
│   │
│   ├── middleware/        # 中间件
│   │   ├── auth.middleware.ts      # 认证中间件
│   │   ├── error.middleware.ts     # 错误处理中间件
│   │   ├── rateLimiter.middleware.ts # 限流中间件
│   │   ├── validation.middleware.ts  # 验证中间件
│   │   └── index.ts
│   │
│   ├── models/            # Mongoose 模型
│   │   ├── Category.ts    # 分类模型
│   │   ├── Comments.ts    # 评论模型
│   │   ├── Post.ts        # 文章模型
│   │   ├── Tag.ts         # 标签模型
│   │   └── User.ts        # 用户模型
│   │
│   ├── routes/            # 路由定义
│   │   ├── auth.routes.ts # 认证路由
│   │   ├── post.routes.ts # 文章路由
│   │   ├── user.routes.ts # 用户路由
│   │   └── index.ts       # 路由汇总
│   │
│   ├── services/          # 服务层（业务逻辑）
│   │   ├── auth.service.ts    # 认证服务
│   │   ├── post.service.ts    # 文章服务
│   │   ├── user.service.ts    # 用户服务
│   │   └── index.ts
│   │
│   ├── types/             # TypeScript 类型定义
│   │   ├── category.ts
│   │   ├── comment.ts
│   │   ├── common.ts
│   │   ├── post.ts
│   │   ├── tag.ts
│   │   ├── user.ts
│   │   └── index.ts
│   │
│   ├── utils/             # 工具函数
│   │   ├── apiResponse.ts # API 响应工具
│   │   ├── logger.ts      # 日志工具
│   │   └── index.ts
│   │
│   ├── validators/        # 请求验证器
│   │   ├── post.validator.ts
│   │   ├── user.validator.ts
│   │   └── index.ts
│   │
│   ├── app.ts             # Express 应用配置
│   └── index.ts           # 应用入口文件
│
├── public/
│   ├── images/            # 静态图片资源
│   └── uploads/           # 上传文件存储
│
├── .env                   # 环境变量配置
├── .gitignore             # Git 忽略配置
├── package.json           # 项目依赖配置
├── tsconfig.json          # TypeScript 配置
├── eslint.config.mjs      # ESLint 配置
└── README.md              # 项目文档
```

## 安装与启动

### 前置要求

- Node.js (v18.0.0 及以上)
- MongoDB (本地安装或使用 MongoDB Atlas)
- npm 或 pnpm 包管理器

### 环境配置

1. 创建 `.env` 文件并配置以下环境变量：

```env
# 服务器配置
PORT=8000
NODE_ENV=development

# 数据库配置
DATABASE_BASE_URL=mongodb://127.0.0.1:27017/blog_api

# JWT 配置
SECRET_KEY=your_jwt_secret_key_here
TOKEN_EXPIRES_IN=7d

# Redis 配置（可选）
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# 文件上传配置
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./public/uploads
```

### 安装步骤

1. **克隆项目到本地**

```bash
git clone <项目仓库地址>
cd Mongo_api_server
```

2. **安装依赖**

```bash
npm install
# 或使用 pnpm
pnpm install
```

3. **配置环境变量**

按照上面的说明创建 `.env` 文件并设置相应变量

4. **启动 MongoDB 服务**

确保您的 MongoDB 服务已启动并运行

```bash
# Windows (如果 MongoDB 作为服务安装)
net start MongoDB

# macOS (使用 Homebrew)
brew services start mongodb-community

# Linux (systemd)
sudo systemctl start mongod
```

5. **启动项目**

**开发模式**（带热重载）：
```bash
npm run dev
```

**生产模式**：
```bash
# 先编译 TypeScript
npm run build

# 启动服务
npm start
```

**代码检查和格式化**：
```bash
# ESLint 检查
npm run lint

# 自动修复 ESLint 问题
npm run lint:fix

# Prettier 格式化
npm run format
```

服务器将在 http://localhost:8000 启动。

## API 接口说明

### 基础 URL

所有 API 接口都以 `/api` 作为前缀。

**健康检查接口：**
- **URL**: `/health`
- **方法**: `GET`
- **认证**: 不需要
- **响应**:
  ```json
  {
    "success": true,
    "message": "服务运行正常",
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
  ```

---

### 认证接口 (`/api/auth`)

#### 1. 用户注册

- **URL**: `/api/auth/register`
- **方法**: `POST`
- **认证**: 不需要
- **请求体参数**:
  ```json
  {
    "name": "用户名",
    "email": "user@example.com",
    "password": "用户密码 (最少 6 位)"
  }
  ```
- **响应示例**:
  - 成功 (201):
    ```json
    {
      "success": true,
      "message": "用户注册成功",
      "data": {
        "id": "用户 ID",
        "name": "用户名",
        "email": "user@example.com",
        "createdAt": "创建时间"
      }
    }
    ```
  - 失败 (400):
    ```json
    {
      "success": false,
      "message": "该邮箱已被注册"
    }
    ```

#### 2. 用户登录

- **URL**: `/api/auth/login`
- **方法**: `POST`
- **认证**: 不需要
- **请求体参数**:
  ```json
  {
    "email": "user@example.com",
    "password": "用户密码"
  }
  ```
- **响应示例**:
  - 成功 (200):
    ```json
    {
      "success": true,
      "message": "登录成功",
      "data": {
        "user": {
          "id": "用户 ID",
          "name": "用户名",
          "email": "user@example.com"
        },
        "token": "JWT 令牌"
      }
    }
    ```
  - 失败 (401):
    ```json
    {
      "success": false,
      "message": "邮箱或密码错误"
    }
    ```

#### 3. 用户登出

- **URL**: `/api/auth/logout`
- **方法**: `POST`
- **认证**: 需要 JWT
- **响应示例**:
  - 成功 (200):
    ```json
    {
      "success": true,
      "message": "已安全登出"
    }
    ```

---

### 用户接口 (`/api/users`)

#### 1. 获取当前用户信息

- **URL**: `/api/users/me`
- **方法**: `GET`
- **认证**: 需要 JWT
- **响应示例**:
  - 成功 (200):
    ```json
    {
      "success": true,
      "data": {
        "id": "用户 ID",
        "name": "用户名",
        "email": "user@example.com",
        "createdAt": "创建时间",
        "updatedAt": "更新时间"
      }
    }
    ```

#### 2. 更新当前用户信息

- **URL**: `/api/users/me`
- **方法**: `PUT`
- **认证**: 需要 JWT
- **请求体参数**:
  ```json
  {
    "name": "新用户名",
    "email": "newemail@example.com"
  }
  ```
- **响应示例**:
  - 成功 (200):
    ```json
    {
      "success": true,
      "message": "用户资料更新成功",
      "data": {
        "id": "用户 ID",
        "name": "新用户名",
        "email": "newemail@example.com",
        "updatedAt": "更新时间"
      }
    }
    ```

#### 3. 删除当前用户

- **URL**: `/api/users/me`
- **方法**: `DELETE`
- **认证**: 需要 JWT
- **响应示例**:
  - 成功 (200):
    ```json
    {
      "success": true,
      "message": "用户账户删除成功"
    }
    ```

#### 4. 获取所有用户（分页）

- **URL**: `/api/users`
- **方法**: `GET`
- **认证**: 需要 JWT
- **查询参数**:
  - `page`: 页码（默认为 1）
  - `limit`: 每页数量（默认为 10）
- **响应示例**:
  - 成功 (200):
    ```json
    {
      "success": true,
      "data": {
        "users": [...],
        "pagination": {
          "currentPage": 1,
          "totalPages": 1,
          "totalUsers": 10
        }
      }
    }
    ```

---

### 文章接口 (`/api/posts`)

#### 1. 获取所有文章

- **URL**: `/api/posts`
- **方法**: `GET`
- **认证**: 不需要
- **查询参数**:
  - `page`: 页码（默认为 1）
  - `limit`: 每页数量（默认为 10）
  - `category`: 分类筛选
  - `tag`: 标签筛选
- **响应示例**:
  - 成功 (200):
    ```json
    {
      "success": true,
      "data": {
        "posts": [
          {
            "id": "文章 ID",
            "title": "文章标题",
            "content": "文章内容",
            "slug": "文章 slug",
            "author": {
              "id": "作者 ID",
              "name": "作者名"
            },
            "createdAt": "创建时间",
            "updatedAt": "更新时间"
          }
        ],
        "pagination": {
          "currentPage": 1,
          "totalPages": 5,
          "totalPosts": 50
        }
      }
    }
    ```

#### 2. 获取单篇文章

- **URL**: `/api/posts/:slug`
- **方法**: `GET`
- **认证**: 不需要
- **参数**: `slug` - 文章 slug
- **响应示例**:
  - 成功 (200):
    ```json
    {
      "success": true,
      "data": {
        "id": "文章 ID",
        "title": "文章标题",
        "content": "文章内容",
        "slug": "文章 slug",
        "author": {
          "id": "作者 ID",
          "name": "作者名",
          "email": "作者邮箱"
        },
        "createdAt": "创建时间",
        "updatedAt": "更新时间"
      }
    }
    ```
  - 失败 (404):
    ```json
    {
      "success": false,
      "message": "文章未找到"
    }
    ```

#### 3. 创建新文章

- **URL**: `/api/posts`
- **方法**: `POST`
- **认证**: 需要 JWT
- **请求体参数**:
  ```json
  {
    "title": "文章标题",
    "content": "文章内容",
    "slug": "文章 slug",
    "category": "分类 ID",
    "tags": ["标签 ID1", "标签 ID2"]
  }
  ```
- **响应示例**:
  - 成功 (201):
    ```json
    {
      "success": true,
      "message": "文章创建成功",
      "data": {
        "id": "文章 ID",
        "title": "文章标题",
        "slug": "文章 slug"
      }
    }
    ```
  - 失败 (400):
    ```json
    {
      "success": false,
      "message": "文章 slug 已存在"
    }
    ```

#### 4. 更新文章

- **URL**: `/api/posts/:id`
- **方法**: `PUT`
- **认证**: 需要 JWT（仅作者可更新）
- **参数**: `id` - 文章 ID
- **请求体参数**:
  ```json
  {
    "title": "新标题",
    "content": "新内容",
    "slug": "新 slug"
  }
  ```
- **响应示例**:
  - 成功 (200):
    ```json
    {
      "success": true,
      "message": "文章更新成功",
      "data": {
        "id": "文章 ID",
        "title": "新标题",
        "updatedAt": "更新时间"
      }
    }
    ```
  - 失败 (403):
    ```json
    {
      "success": false,
      "message": "无权修改此文章"
    }
    ```

#### 5. 删除文章

- **URL**: `/api/posts/:id`
- **方法**: `DELETE`
- **认证**: 需要 JWT（仅作者可删除）
- **参数**: `id` - 文章 ID
- **响应示例**:
  - 成功 (200):
    ```json
    {
      "success": true,
      "message": "文章删除成功"
    }
    ```

#### 6. 上传文章图片

- **URL**: `/api/posts/upload-image`
- **方法**: `POST`
- **认证**: 需要 JWT
- **表单数据**:
  - `image`: 图片文件（必需）
  - `postId`: 文章 ID（可选）
- **响应示例**:
  - 成功 (200):
    ```json
    {
      "success": true,
      "message": "图片上传成功",
      "data": {
        "url": "/uploads/image-1234567890.jpg",
        "filename": "image-1234567890.jpg"
      }
    }
    ```
  - 失败 (400):
    ```json
    {
      "success": false,
      "message": "未提供图片文件"
    }
    ```

---

## 安全特性

### 1. 密码安全
- ✅ 使用 bcrypt 进行密码哈希加密（12 轮）
- ✅ 密码长度限制：6-255 字符
- ✅ 数据库查询自动排除密码字段

### 2. 身份验证
- ✅ JWT Token 认证
- ✅ Token 过期时间可配置（默认 7 天）
- ✅ Token 自动刷新机制

### 3. 访问控制
- ✅ 认证中间件验证用户身份
- ✅ 权限验证（仅作者可修改/删除文章）
- ✅ 受保护的路由需要有效 Token

### 4. 输入验证
- ✅ 使用 Zod 进行请求体验证
- ✅ 邮箱格式验证
- ✅ 用户名长度验证
- ✅ 密码强度验证

### 5. 限流保护
- ✅ API 请求限流（默认 100 次/15 分钟）
- ✅ 防止暴力破解
- ✅ 防止 DDoS 攻击

### 6. 错误处理
- ✅ 统一错误响应格式
- ✅ 自定义错误类（AppError）
- ✅ 异步错误包装器（asyncHandler）
- ✅ 404 和 500 错误处理

### 7. CORS 安全
- ✅ 跨域资源共享配置
- ✅ 可配置允许的域名
- ✅ 支持凭证传输

## 开发指南

### 添加新功能

遵循 MVC（Model-View-Controller）架构模式：

1. **创建数据模型** (`src/models/`)
   ```typescript
   // src/models/Category.ts
   import mongoose, { Schema } from 'mongoose'

   const categorySchema = new Schema({
     name: { type: String, required: true },
     slug: { type: String, required: true, unique: true }
   })

   export default mongoose.model('Category', categorySchema)
   ```

2. **创建类型定义** (`src/types/`)
   ```typescript
   // src/types/category.ts
   export interface ICategory {
     _id: string
     name: string
     slug: string
     createdAt: Date
     updatedAt: Date
   }
   ```

3. **创建服务层** (`src/services/`)
   ```typescript
   // src/services/category.service.ts
   import Category from '../models/Category'

   export async function getAllCategories() {
     return await Category.find().sort({ name: 1 })
   }
   ```

4. **创建控制器** (`src/controllers/`)
   ```typescript
   // src/controllers/category.controller.ts
   import asyncHandler from '../errors/asyncHandler'
   import * as categoryService from '../services/category.service'

   export const getCategories = asyncHandler(async (req, res) => {
     const categories = await categoryService.getAllCategories()
     res.json({ success: true, data: categories })
   })
   ```

5. **创建验证器** (`src/validators/`)
   ```typescript
   // src/validators/category.validator.ts
   import { z } from 'zod'

   export const createCategorySchema = z.object({
     name: z.string().min(2).max(50),
     slug: z.string().min(2).max(50)
   })
   ```

6. **创建路由** (`src/routes/`)
   ```typescript
   // src/routes/category.routes.ts
   import { Router } from 'express'
   import { getCategories } from '../controllers/category.controller'
   import { protect } from '../middleware/auth.middleware'

   const router = Router()

   router.get('/', getCategories)

   export default router
   ```

7. **注册路由** (`src/routes/index.ts`)
   ```typescript
   import categoryRoutes from './category.routes'

   router.use('/categories', categoryRoutes)
   ```
## 部署

### 生产环境部署

1. **设置环境变量**
   ```bash
   NODE_ENV=production
   PORT=3000
   DATABASE_BASE_URL=mongodb+srv://username:password@cluster.mongodb.net/blog_api
   SECRET_KEY=your_production_secret_key
   ```

2. **构建项目**
   ```bash
   npm run build
   ```

3. **启动服务**
   ```bash
   npm start
   ```

4. **使用 PM2 进程管理**（推荐）
   ```bash
   # 安装 PM2
   npm install -g pm2

   # 启动应用
   pm2 start dist/index.js --name blog-api

   # 设置开机自启
   pm2 startup
   pm2 save
   ```

### Docker 部署

1. **创建 Dockerfile**
   ```dockerfile
   FROM node:18-alpine

   WORKDIR /app

   COPY package*.json ./

   RUN npm ci --only=production

   COPY . .

   RUN npm run build

   EXPOSE 3000

   CMD ["node", "dist/index.js"]
   ```

2. **创建 docker-compose.yml**
   ```yaml
   version: '3.8'

   services:
     api:
       build: .
       ports:
         - "3000:3000"
       environment:
         - NODE_ENV=production
         - DATABASE_BASE_URL=mongodb://mongo:27017/blog_api
       depends_on:
         - mongo

     mongo:
       image: mongo:6
       volumes:
         - mongo-data:/data/db

   volumes:
     mongo-data:
   ```

3. **启动容器**
   ```bash
   docker-compose up -d
   ```

## 常见问题

### 1. 数据库连接失败
- 检查 MongoDB 服务是否运行
- 验证 `DATABASE_BASE_URL` 配置
- 检查网络连接和防火墙设置

### 2. JWT Token 无效
- 检查 `SECRET_KEY` 配置
- 确认 Token 未过期
- 验证 Authorization header 格式（Bearer + Token）

### 3. 文件上传失败
- 检查 `public/uploads` 目录权限
- 验证文件大小限制配置
- 确认表单字段名称正确

### 4. CORS 错误
- 检查 CORS 中间件配置
- 确认前端请求的 origin 在允许列表中
- 验证请求 headers 配置

## 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 代码规范
- 遵循 ESLint 和 Prettier 规则
- 使用 TypeScript 严格模式
- 编写有意义的注释
- 保持代码整洁和可读性

## 许可证

本项目采用 ISC 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 联系方式

如有任何问题或建议，请联系项目维护者。

---

**最后更新**: 2024-01-01
**版本**: 1.0.0
**维护人员**: 项目维护团队

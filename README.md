# 博客API后端服务

一个基于Node.js、Express和MongoDB的全功能博客API后端服务，支持用户认证、文章管理、文件上传等功能。

## 项目简介

本项目是一个完整的博客API后端服务，提供用户认证、文章管理、文件上传等核心功能。项目采用现代Web开发技术栈，具有良好的安全性、可扩展性和可维护性。

## 功能特性

- ✅ 用户注册、登录、登出功能
- ✅ JWT身份认证与授权
- ✅ 用户信息管理（查询、更新、删除）
- ✅ 博客文章管理（增删改查）
- ✅ 文章图片上传功能
- ✅ 安全密码加密（bcrypt）
- ✅ 跨域资源共享（CORS）支持
- ✅ RESTful API设计

## 技术栈

- **Node.js**: JavaScript运行时环境
- **Express**: Web应用框架
- **MongoDB**: NoSQL数据库
- **Mongoose**: MongoDB对象文档映射（ODM）库
- **JWT**: JSON Web Token用于身份验证
- **bcrypt**: 密码哈希加密
- **multer**: 文件上传处理
- **cors**: 跨域资源共享中间件
- **dotenv**: 环境变量管理

## 项目结构

```
├── README.md                    # 项目说明文档
├── .gitignore                   # Git忽略文件配置
├── LICENSE                      # 许可证文件
├── package.json                 # 项目依赖配置
├── package-lock.json            # 锁定依赖版本
├── server.js                    # 服务器入口文件
├── config/
│   └── db.config.js             # 数据库连接配置
├── jwt/
│   └── config.js                # JWT配置
├── models/
│   ├── user.js                  # 用户数据模型
│   └── post.js                  # 文章数据模型
├── routes/
│   ├── users.js                 # 用户路由
│   └── post.js                  # 文章路由
├── router_handler/
│   ├── users_handler.js         # 用户路由处理函数
│   └── posts_handler.js         # 文章路由处理函数
├── utils/
│   └── auth.js                  # 认证中间件
└── public/
    └── uploads/                 # 上传文件存储目录
```

## 安装与启动

### 前置要求

- Node.js (v14.0.0及以上)
- MongoDB (本地安装或使用MongoDB Atlas)
- npm 或 yarn 包管理器

### 环境配置

1. 创建 `.env` 文件并配置以下环境变量：

```env
PORT=3000
DATABASE_BASE_URL=mongodb://localhost:27017/blog_api
SECRET_KEY=your_jwt_secret_key_here
TOKEN_EXPIRES_IN=7d
NODE_ENV=development
```

### 安装步骤

1. 克隆项目到本地

```bash
git clone <项目仓库地址>
cd Mongo_api_server
```

2. 安装依赖

```bash
npm install
```

3. 配置环境变量

按照上面的说明创建 `.env` 文件并设置相应变量

4. 启动MongoDB服务

确保您的MongoDB服务已启动并运行

5. 启动项目

开发模式（带热重载）：
```bash
npm run dev
```

生产模式：
```bash
npm start
```

服务器将在 http://localhost:3000 启动。

## API 接口说明

### 基础URL

所有API接口都以 `/api` 作为前缀。

### 用户接口 (`/api`)

#### 1. 用户注册

- **URL**: `/api/register`
- **方法**: `POST`
- **认证**: 不需要
- **请求体参数**:
  ```json
  {
    "name": "用户名",
    "email": "user@example.com",
    "password": "用户密码"
  }
  ```
- **响应示例**:
  - 成功 (201):
    ```json
    {
      "message": "user created !",
      "user": {
        "id": "用户ID",
        "email": "user@example.com",
        "password": "用户密码哈希值",
        "name": "用户名"
      }
    }
    ```
  - 失败 (400):
    ```json
    {
      "message": "The user has been registerd!"
    }
    ```

#### 2. 用户登录

- **URL**: `/api/login`
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
      "user": {
        "name": "用户名",
        "email": "user@example.com"
      },
      "isLogged": true,
      "message": "user logged",
      "token": "JWT令牌"
    }
    ```
  - 失败 (400):
    ```json
    {
      "isLogged": false,
      "message": "email or password invalid"
    }
    ```

#### 3. 获取指定用户信息

- **URL**: `/api/getUserById/:id`
- **方法**: `GET`
- **认证**: 不需要
- **参数**: `id` - 用户ID
- **响应示例**:
  - 成功 (200):
    ```json
    {
      "_id": "用户ID",
      "name": "用户名",
      "email": "user@example.com",
      "createdAt": "创建时间",
      "updatedAt": "更新时间"
    }
    ```
  - 失败 (404):
    ```json
    {
      "messag": "用户未找到"
    }
    ```

#### 4. 获取所有用户（支持分页和筛选）

- **URL**: `/api/`
- **方法**: `GET`
- **认证**: 不需要
- **查询参数**:
  - `page`: 页码（默认为1）
  - `limit`: 每页数量（默认为10）
  - `role`: 角色筛选（可选）
- **响应示例**:
  - 成功 (200):
    ```json
    {
      "users": [
        {
          "_id": "用户ID",
          "name": "用户名",
          "email": "user@example.com",
          "createdAt": "创建时间"
        }
      ],
      "currentPage": 1,
      "totalPages": 1,
      "totalUsers": 1
    }
    ```

#### 5. 更新用户信息

- **URL**: `/api/updateUserById/:id`
- **方法**: `PATCH`
- **认证**: 需要JWT
- **参数**: `id` - 用户ID
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
      "message": "用户资料更新成功",
      "user": {
        "_id": "用户ID",
        "name": "新用户名",
        "email": "newemail@example.com",
        "updatedAt": "更新时间"
      }
    }
    ```
  - 失败 (404):
    ```json
    {
      "message": "用户未找到，更新失败"
    }
    ```

#### 6. 删除用户

- **URL**: `/api/dropUserById/:id`
- **方法**: `DELETE`
- **认证**: 需要JWT
- **参数**: `id` - 用户ID
- **响应示例**:
  - 成功 (200):
    ```json
    {
      "message": "用户账户删除成功",
      "id": "用户ID"
    }
    ```
  - 失败 (404):
    ```json
    {
      "message": "用户未找到,无法删除"
    }
    ```

#### 7. 检查用户登录状态

- **URL**: `/api/check/user/loggedin`
- **方法**: `GET`
- **认证**: 需要JWT
- **响应示例**:
  - 成功 (200):
    ```json
    {
      "success": true
    }
    ```

#### 8. 用户登出

- **URL**: `/api/logout`
- **方法**: `POST`
- **认证**: 需要JWT
- **响应示例**:
  - 成功 (200):
    ```json
    {
      "message": "user logged out!"
    }
    ```

### 文章接口 (`/api/posts`)

#### 1. 获取所有文章

- **URL**: `/api/posts`
- **方法**: `GET`
- **认证**: 不需要
- **响应示例**:
  - 成功 (200):
    ```json
    {
      "data": [
        {
          "_id": "文章ID",
          "title": "文章标题",
          "post_content": "文章内容",
          "slug": "文章slug",
          "user": "作者ID",
          "createdAt": "创建时间",
          "updatedAt": "更新时间"
        }
      ]
    }
    ```

#### 2. 获取单篇文章

- **URL**: `/api/posts/:slug`
- **方法**: `GET`
- **认证**: 不需要
- **参数**: `slug` - 文章slug
- **响应示例**:
  - 成功 (200):
    ```json
    {
      "_id": "文章ID",
      "title": "文章标题",
      "post_content": "文章内容",
      "slug": "文章slug",
      "user": "作者ID",
      "createdAt": "创建时间",
      "updatedAt": "更新时间"
    }
    ```
  - 失败 (404):
    ```json
    {
      "message": "Post not found"
    }
    ```

#### 3. 获取文章总数

- **URL**: `/api/posts/count/post`
- **方法**: `GET`
- **认证**: 不需要
- **响应示例**:
  - 成功 (200):
    ```json
    {
      "data": 10
    }
    ```

#### 4. 获取客户端文章

- **URL**: `/api/posts/client/post`
- **方法**: `GET`
- **认证**: 不需要
- **响应示例**:
  - 成功 (200):
    ```json
    [
      {
        "_id": "文章ID",
        "title": "文章标题",
        "post_content": "文章内容",
        "slug": "文章slug",
        "user": "作者ID",
        "createdAt": "创建时间",
        "updatedAt": "更新时间"
      }
    ]
    ```

#### 5. 创建新文章

- **URL**: `/api/posts`
- **方法**: `POST`
- **认证**: 需要JWT
- **请求体参数**:
  ```json
  {
    "title": "文章标题",
    "post_content": "文章内容",
    "slug": "文章slug"
  }
  ```
- **响应示例**:
  - 成功 (201):
    ```json
    {
      "message": "Post created !"
    }
    ```
  - 失败 (400):
    ```json
    {
      "message": "Slug already exists"
    }
    ```

#### 6. 更新文章

- **URL**: `/api/posts/:id`
- **方法**: `PUT`
- **认证**: 需要JWT
- **参数**: `id` - 文章ID
- **请求体参数**:
  ```json
  {
    "title": "新标题",
    "post_content": "新内容"
  }
  ```
- **响应示例**:
  - 成功 (200):
    ```json
    {
      "message": "post updated!"
    }
    ```
  - 失败 (403):
    ```json
    {
      "message": "Not authrorized"
    }
    ```

#### 7. 删除文章

- **URL**: `/api/posts/:id`
- **方法**: `DELETE`
- **认证**: 需要JWT
- **参数**: `id` - 文章ID
- **响应示例**:
  - 成功 (200):
    ```json
    {
      "message": "Post deleted !"
    }
    ```
  - 失败 (404):
    ```json
    {
      "message": "Post not found"
    }
    ```

#### 8. 上传文章图片

- **URL**: `/api/posts/upload-image`
- **方法**: `POST`
- **认证**: 需要JWT
- **表单数据**: 
  - `image`: 图片文件
  - `postId`: 文章ID
- **响应示例**:
  - 成功 (200):
    ```json
    {
      "message": "Post image uploaded !"
    }
    ```
  - 失败 (400):
    ```json
    {
      "message": "postId is required"
    }
    ```

## 安全特性

1. **密码安全**: 使用bcrypt进行密码哈希加密，最小长度6字符，最大长度255字符
2. **身份验证**: 使用JWT进行用户身份验证，令牌有过期时间
3. **访问控制**: 通过中间件限制受保护路由的访问，验证用户权限
4. **输入验证**: 对用户输入进行基本验证（邮箱格式、用户名长度等）
5. **错误处理**: 统一的错误处理机制
6. **密码保护**: 数据库查询时自动排除密码字段

## 开发指南

### 添加新功能

1. 在 `models` 目录下创建新的数据模型
2. 在 `routes` 目录下创建相应的路由文件
3. 在 `router_handler` 目录下创建路由处理函数
4. 在 `server.js` 中引入并挂载新路由

### 测试API

推荐使用 Postman 或 curl 来测试API接口：

```bash
# 获取所有用户
curl http://localhost:3000/api

# 注册新用户
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"测试用户","email":"test@example.com","password":"123456"}'

# 登录用户
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456"}'

# 创建文章（需要JWT token）
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"title":"文章标题","post_content":"文章内容","slug":"article-slug"}'
```

## 部署

### 生产环境部署

1. 设置环境变量
2. 确保MongoDB服务可用
3. 构建项目
4. 启动服务

```bash
npm start
```

### Docker部署（可选）

如果您希望使用Docker部署，请创建 `Dockerfile`:

```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 贡献

欢迎贡献代码！请遵循以下步骤：

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 许可证

本项目采用 ISC 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 联系方式

如有任何问题或建议，请联系项目维护者。
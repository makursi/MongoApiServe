# 博客API后端服务

一个基于Node.js、Express和MongoDB的全功能博客API后端服务，支持用户认证、文章管理、文件上传等功能。


![Alt text](./public/images/Carla.webp)
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
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
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
      "message": "注册成功",
      "user": {
        "_id": "用户ID",
        "name": "用户名",
        "email": "user@example.com"
      }
    }
    ```
  - 失败 (400):
    ```json
    {
      "error": "错误信息"
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
      "message": "登录成功",
      "token": "JWT令牌",
      "user": {
        "_id": "用户ID",
        "name": "用户名",
        "email": "user@example.com"
      }
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
      "user": {
        "_id": "用户ID",
        "name": "用户名",
        "email": "user@example.com"
      }
    }
    ```

#### 4. 获取所有用户

- **URL**: `/api/`
- **方法**: `GET`
- **认证**: 不需要
- **响应示例**:
  - 成功 (200):
    ```json
    {
      "users": [
        {
          "_id": "用户ID",
          "name": "用户名",
          "email": "user@example.com"
        }
      ]
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
      "message": "用户信息更新成功",
      "user": {
        "_id": "用户ID",
        "name": "新用户名",
        "email": "newemail@example.com"
      }
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
      "message": "用户删除成功"
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
      "isLoggedIn": true,
      "user": {
        "_id": "用户ID",
        "name": "用户名",
        "email": "user@example.com"
      }
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
      "message": "登出成功"
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
      "posts": [
        {
          "_id": "文章ID",
          "title": "文章标题",
          "post_content": "文章内容",
          "slug": "文章slug",
          "user": "作者ID",
          "createdAt": "创建时间"
        }
      ],
      "total": 10,
      "page": 1,
      "limit": 10
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
      "post": {
        "_id": "文章ID",
        "title": "文章标题",
        "post_content": "文章内容",
        "slug": "文章slug",
        "user": "作者ID",
        "createdAt": "创建时间"
      }
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
      "count": 10
    }
    ```

#### 4. 获取客户端文章

- **URL**: `/api/posts/client/post`
- **方法**: `GET`
- **认证**: 不需要
- **响应示例**:
  - 成功 (200):
    ```json
    {
      "posts": [...]
    }
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
      "message": "文章创建成功",
      "post": {
        "_id": "文章ID",
        "title": "文章标题",
        "post_content": "文章内容",
        "slug": "文章slug",
        "user": "作者ID"
      }
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
      "message": "文章更新成功",
      "post": {
        "_id": "文章ID",
        "title": "新标题",
        "post_content": "新内容",
        "slug": "文章slug",
        "user": "作者ID"
      }
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
      "message": "文章删除成功"
    }
    ```

#### 8. 上传文章图片

- **URL**: `/api/posts/upload-image`
- **方法**: `POST`
- **认证**: 需要JWT
- **表单数据**: `image` - 图片文件
- **响应示例**:
  - 成功 (200):
    ```json
    {
      "message": "图片上传成功",
      "imageUrl": "/uploads/filename.jpg"
    }
    ```

## 安全特性

1. **密码安全**: 使用bcrypt进行密码哈希加密
2. **身份验证**: 使用JWT进行用户身份验证
3. **访问控制**: 通过中间件限制受保护路由的访问
4. **输入验证**: 对用户输入进行基本验证
5. **错误处理**: 统一的错误处理机制

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
    ```json
    { "message": "用户名已存在" }
    ```

#### 2. 查询用户信息

- **URL**: `/api/:id`
- **方法**: `GET`
- **路径参数**:
  - `id`: 用户ID
- **响应示例**:
  - 成功 (200):
    ```json
    {
      "message": "查询成功",
      "user": {
        "id": 1,
        "name": "用户名",
        "username": "user123",
        "email": "user@example.com",
        "phone": 13800138000
      }
    }
    ```
  - 失败 (404):
    ```json
    { "message": "用户不存在" }
    ```

#### 3. 更新用户资料

- **URL**: `/api/:id`
- **方法**: `PUT`
- **路径参数**:
  - `id`: 用户ID
- **请求体参数** (可选字段):
  ```json
  {
    "name": "新用户名",
    "email": "newemail@example.com",
    "phone": 13900139000
  }
  ```
- **响应示例**:
  - 成功 (200):
    ```json
    {
      "message": "更新成功",
      "user": { "更新后的用户信息" }
    }
    ```
  - 失败 (404):
    ```json
    { "message": "用户不存在" }
    ```

#### 4. 删除用户账户

- **URL**: `/api/:id`
- **方法**: `DELETE`
- **路径参数**:
  - `id`: 用户ID
- **响应示例**:
  - 成功 (200):
    ```json
    {
      "message": "账户已成功注销",
      "user": {
        "id": 1,
        "username": "user123"
      }
    }
    ```
  - 失败 (404):
    ```json
    { "message": "用户不存在" }
    ```

## 错误处理

所有API接口在发生错误时都会返回适当的HTTP状态码和错误信息。常见的错误状态码包括：
- 400: 请求参数错误
- 404: 资源不存在
- 500: 服务器内部错误

## 开发注意事项

1. 请确保在修改代码后进行充分测试
2. 如需要连接远程MongoDB，请修改 `dataBase/db.js` 中的连接字符串
3. 生产环境中请配置适当的安全措施，如添加请求验证、授权等



## License

[MIT](https://opensource.org/licenses/MIT)

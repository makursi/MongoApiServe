# User Center API Server

一个基于Node.js、Express和MongoDB的用户中心API服务。

## 项目简介

本项目提供用户的基本CRUD（创建、读取、更新、删除）操作接口，包括用户注册、查询用户信息、更新用户资料和删除用户账户等功能。

## 技术栈

- Node.js
- Express
- MongoDB (通过Mongoose ODM)

## 项目结构

```
├── README.md              # 项目说明文档
├── .gitignore             # Git忽略文件配置
├── package.json           # 项目依赖配置
├── server.js              # 服务器入口文件
├── dataBase/
│   └── db.js              # 数据库连接配置
├── db_models/
│   └── User.js            # 用户数据模型
├── routes/
│   └── users.js           # 用户路由配置
└── router_handler/
    └── users_handler.js   # 用户路由处理函数
```

## 安装与启动

### 前置要求

- Node.js (v14.0.0+) 
- MongoDB (本地安装或使用MongoDB Atlas)

### 安装步骤

1. 克隆项目到本地

```bash
git clone <项目仓库地址>
cd myApiServer
```

2. 安装依赖

```bash
npm install
```

3. 启动MongoDB服务

确保您的MongoDB服务已启动并运行在默认端口27017。

4. 启动项目

```bash
npm run dev
```

服务器将在 http://localhost:3000 启动。

## API 接口说明

### 基础URL

所有API接口都以 `/api` 作为前缀。

### 用户接口

#### 1. 用户注册

- **URL**: `/api/register`
- **方法**: `POST`
- **请求体参数**:
  ```json
  {
    "id": 1,
    "name": "用户名",
    "username": "user123",
    "email": "user@example.com",
    "phone": 13800138000
  }
  ```
- **响应示例**:
  - 成功 (201):
    ```json
    {
      "message": "注册成功",
      "user": {
        "id": 1,
        "name": "用户名",
        "username": "user123"
      }
    }
    ```
  - 失败 (400):
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

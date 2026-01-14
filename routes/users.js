import express from 'express'
import { getUserById, getUsers, updateUserById, dropUserById, registerUser, loginUser } from '../router_handler/users_handler.js'
// 构建路由对象
const router = express.Router()

//配置路由操作

//1.创建用户操作-注册新用户
router.post('/register',registerUser)
//2.查询用户操作-查询用户
router.get('/getUserById/:id',getUserById)

router.get('/getUsers',getUsers)
//3.更新用户操作-修改用户资料
router.patch('/updateUserById/:id', updateUserById)
//4.删除用户操作-注销账户
router.delete('/deleteUserById/:id', dropUserById)

//5.用户登录操作-登录用户
router.post('/loginUser',loginUser)
// 导出路由对象
export default router


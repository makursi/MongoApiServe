import { User } from '../db_models/User.js'

//创建新用户函数模块
export async function registerUser(req,res){

  const {username , email , password , phone , name} = req.body
  try {
    //1.检查用户是否存在
    const existingUser = await User.findOne({username});
    if(existingUser){
       return res.status(400).json({message:'该用户已被注册'})
    }
    //2.在使用bcrypt库对password进行hash加密后
    //实例化Mongoose Model

    const newUser = new User({
      username,
      password:password,
      email,
      phone,
      name,
    })
    //保存文档
    const savedUser = await newUser.save();

    //响应成功返回
    res.status(201).json({
      message:'用户注册成功',
      user:{
         id:savedUser._id,
        username:savedUser.username ,
        email:savedUser.email
      }
    })
  } catch (error) {
    console.error("用户注册失败:",error)
  res.status(500).json({message:'服务器内部错误'})
  }
}


//2.通过id查询用户，查询用户表
export async function getUserById(req,res){

try {
  const userId = req.params.id

  //使用.select('-password')排除密码字段
  const user = await User.findById(userId).select('-password')

  if (!user) {
    return res.status(404).json({ messag: '用户未找到' })
  }

  res.status(200).json(user)

} catch (error) {
  res.status(500).json({message:'服务器错误或ID格式不正确'})
}
}


//查询用户列表(分页和筛选)
export async function getUsers(req,res){
 //从查询参数获取分页和筛选条件
 const page = parseInt(req.query.page) || 1;
 const limit = parseInt(req.query.limit) || 10;
 const role = req.query.role; 

 let query = {};
 if(role){
query.role = role
 }
  try {
    //1.计算总数
    const totalUsers = await User.countDocuments(query);

    //2.执行查询
    const users = await User.find(query).select('-password').skip((page - 1) * limit).limit(limit).sort({ createdAt: -1 });

    res.status(200).json({
      users,
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
      totalUsers
    })
  } catch (error) {
    res.status(500).json({ message: '获取用户列表失败' })
  }
}


//修改用户资料
//更新操作是修改数据库中已有的文档。
// Mongoose 提供了 findByIdAndUpdate() 和 updateOne() 等方法。
export async function updateUserById(req, res){
const userId = req.params.id;
const updates = req.body;

  // Mongoose 的 $set 操作符确保只更新提供的字段
  const updatePayload = {}

  if(updates.email)
  {
     updatePayload.email = updates.email
  }
  if (updates.name) {
    updatePayload.name = updates.name 
    }

if(updates.role){
   updatePayload.role = updates.role
}
try {
  const updatedUser = await User.findByIdAndUpdate(
    userId, {$set:updatePayload},
    {
       new:true,
        runValidators:true //在更新时运行Schema定义的校验规则
    }
  ).select('-password');
 //用户未找到报错
 if(!updatedUser){
   res.status(404).json({ message: '用户未找到，更新失败' })
 }

 res.status(200).json({message:'用户资料更新成功', user:updatedUser})
} catch (error) {
  console.error("用户更新失败",error);

  res.status(500).json({
     message:'更新失败:数据校验错误或服务器错误'
  })
  
}
}


//删除用户信息,注销用户

export async function deleteUserById (req,res){

  const userId = req.params.id;


try {
  const deletedUser = await User.findByIdAndDelete(userId)
  if (!deletedUser) {
    return res.status(404).json({
      message: '用户未找到,无法删除'
    });
    }
  res.status(200).json({
    message: '用户账户删除成功',
    id: userId
    });
} catch (error) {
  res.status(500).json({ 
    message:'服务器错误'
  })
};
}

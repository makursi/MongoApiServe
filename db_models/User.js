import { type } from 'os';
import mongoose from '../dataBase/db.js'
import bcrypt from 'bcrypt'
const Schema = mongoose.Schema

const userSchema = new Schema({
name:{
  type:String,
  required:true,
  unique:true,
  trim:true //自动去除字符串两端的空白
},
username:{
  type: String,
  required: true,
  unique: true,
  trim: true
},
email:{
   type:String,
   required:false,
   unique:true,
   sparse:true//允许多个文档的email字段为null/undefined
},
phone:{
   type:Number,
  required: true,
  unique: true
}
})
const saltRounds = 10;

userSchema.pre('save', async function(next){
//只有在密码被修改时或新建时才重新哈希
if(!this.isModified('password')){
return next();
}
  try {
    const salt = await bcrypt.genSalt(saltRounds);

    //加密
    const hashedPassword = await bcrypt.hash(this.password, salt)

    //将新建密码替换哈希后的密码
    this.password = hashedPassword
  } catch (error) {
    console.error("Hash Error",error);
    next(error)
  }
})


//利用用户校验规则，创建用户模型
const User = mongoose.model('User',userSchema)

//导出Model模块
export { User }
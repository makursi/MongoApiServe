
import mongoose from 'mongoose';
const Schema = mongoose.Schema
import bcrypt from 'bcrypt'
const userSchema = new Schema({
name:{
  type:String,
  required:true,
  trim:true,//自动去除字符串两端的空白
  maxlength:50 
},
email:{
   type:String,
   required:false,
   unique:true,
   match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
},
password:{
  type: String,
  required: true,
  minlength: 6,
  maxlength: 255,
  select:false
}
})

//对用户模型密码加密
      userSchema.pre('save',async function(next){
           if(!this.isModified('password')){
             return
           }
          const saltRound = 10
         const hashedPassword = await bcrypt.hash(this.password,saltRound)
         this.password = hashedPassword
         next()
      })

//用户密码对比,为userSchema.methods 自定义实例方法
userSchema.methods.matchPassword = async function(enteredPassword){
   return await bcrypt.compare(enteredPassword,this.password)
}


//利用用户校验规则，创建用户模型
const User = mongoose.model('User',userSchema)

//导出Model模块
export default User
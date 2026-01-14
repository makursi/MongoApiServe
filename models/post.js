
import mongoose from "mongoose";

const postsSchema = new mongoose.Schema({
    title: {
      type:String,
       required:true,
       trim:true,
       maxlength:255
    },
    post_content:{
       type:String,
       required:true
    },
    image: {
       type:String,
      default:null
    },
    slug:{
       type:String,
       unique:true,
       required:true
    },
     user:{
       type:mongoose.Schema.ObjectId,
      //  表示这个字段存储的是另一个文档的 _id（MongoDB 的主键，类型是 ObjectId）
       ref:'User',
      //  告诉 Mongoose：这个 ObjectId 指向的是 User 模型 的文档
       required:true

     }
})

postsSchema.index({slug:1})
//1,表示升序
postsSchema.index({createdAt:-1})

const Post = mongoose.model('Post',postsSchema)

export default Post
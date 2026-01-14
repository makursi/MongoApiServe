import { connect } from "http2";
import mongoose from "mongoose";
import { type } from "os";
import { m } from "vue-router/dist/router-CWoNjPRp.mjs";

const postsSchema = new mongoose.Schema({
    title: {
      type:String,
       require:true,
       trim:true,
       maxlength:255
    },
    post_content:{
       type:String,
       require:true
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
       ref:'User',
       required:true
     }
})

postsSchema.index({slug:1})
postsSchema.index({createdAt:-1})

const Post = mongoose.model('Post',postsSchema)

export default Post
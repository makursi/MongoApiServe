
import { log } from 'console';
import Post from '../models/post'
import protect from '../utils/auth'
// get all posts
// GET /api/posts
export async function getPosts(req,res){
   try {
     const posts = await Post.find().sort({createdAt:-1})
     res.json({
       data:posts
     })
   } catch (err) {
    console.error(err);
    res.status(500).json({
       message:'Server Error'
    })
   }
}

export async function getSinglePost(req,res){
     try {
      const post = await Post.findOne({
         slug:req.params.slug
      })
      if(!post){
         return res.status(404).josn({
           message:'Post not found'
         })
      }
       res.json(post)
     } catch (error) {
      console.error(err);
      res.status(500).json({
         message:'Server Error'
})
     } 
}

// Get count of posts(public)
export async function getCountPosts (req,res) {
  try {
    const count = await Post.countDocuments();
    res.json({data:count});
  } catch (err) {
    console.error(err);
    res.status(500).json({message: 'Server Error'})
  }
}

// Get client posts(public)
export async function getClientPosts(req,res){
   try {
    const posts = await Post.find().sort({createdAt:-1})
    res.json(posts)
   } catch (err) {
    console.error(err);
    res.status(500).json({message:'Server Error'})
   }
}


//Create new post
export async function createNewPost(req,res){
  try {
      const {title, post_content,slug} = req.body

      const post = new Post({
         title,
         post_content,
         slug,
         user:req.user.id
      })

      await post.save()
       res.status(201).json({
         message:'Post created !'
       })
  } catch (err) {
    console.error(err);
    
     if(err.code === 11000){
       return res.status(400).json({
         message:'Slug already exists'
       })
     }
     
     res.status(500).json({message:'Server Error'})
  }
}




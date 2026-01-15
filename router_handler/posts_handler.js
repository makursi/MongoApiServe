import fs from 'fs'
import path from 'path'
import Post from '../models/post'
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

export async function updatePost(req,res) {
  try {
    let post = Post.findById(req.params.id)

    if(!post){
       res.status(404).json({
         message:'Post not found'
       })
    }

   if(post.user.toString() !== req.user.id){ 
return res.status(403).json({
   message:'Not authrorized'
})
   }


   post = await Post.findByIdAndUpdate(req.params.id,req.body,{
     new:true,
     runValidators:true
   })

   res.json({
     message:'post updated!'
   })
  } catch (err) {
    console.error(err);
    

    res.status(500).json({
       message:'Server Error'
    })
  }
}

export async function deletePost(req,res){
try {
  let post = Post.findById(req.params.id)

  if (!post) {
    res.status(404).json({
      message: 'Post not found'
    })
  }

  await post.remove()
  res.json({
     message:'Post deleted !'
  })
} catch (err) {
  console.error(err);
   res.status(500).json({
     message:'Server Error'
   })
}
}

export async function uploadPostImg(req,res){
try {
  const { postId } = req.body
  if(!postId){
     return res.status(400).json({
       message:'postId is required'
     })
  }

  const post = await Post.findById(postId)

  if(!post){
     if(req.file){
       fs.unlinkSync(req.file.path)
     }

     return res.status(404).json({
       message:'Post not found'
     })
  }

  const imageUrl = `/upload/${req.file.filename}`

  post.image = imageUrl
  await post.save()

  res.json({
     message:'Post image uploaded !'
  })
} catch (err) {
  console.error(err);
  if(req.file){
     fs.unlinkSync(req.file.path)
  }

  res.status(500).json({
     message:'Server Error'
  })
}
}
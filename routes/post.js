import express from 'express'
import { createNewPost, getClientPosts, getCountPosts, getPosts, getSinglePost } from '../router_handler/posts_handler' 
import fs from 'fs'
import path from 'path'
import multer from 'multer'
import protect from '../utils/auth'
const router = express.Router()


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../public/uploads');
    // Ensure the directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Create a unique filename, e.g., timestamp + original name
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});


router.get('/',getPosts)

router.get('/:slug',getSinglePost)

router.get('/count/post',getCountPosts)

router.get('/client/post',getClientPosts)

router.post('/',protect,createNewPost)


const upload = multer({ storage });
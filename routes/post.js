import express from "express";
//从 Node.js 12+ 开始使用 ESM（即 package.json 中有 "type": "module"），导入本地文件时必须包含完整路径，包括 .js 扩展名（除非你配置了自定义解析器）。
import {
  createNewPost,
  deletePost,
  getClientPosts,
  getCountPosts,
  getPosts,
  getSinglePost,
  updatePost,
  uploadPostImg,
} from "../router_handler/posts_handler.js";
import fs from "fs";
import path from "path";
import multer from "multer";
import protect from "../utils/auth.js";
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../public/uploads");
    // Ensure the directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Create a unique filename, e.g., timestamp + original name
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.get("/", getPosts);

router.get("/:slug", getSinglePost);

router.get("/count/post", getCountPosts);

router.get("/client/post", getClientPosts);

router.post("/createpost", protect, createNewPost);

router.put("/:id", protect, updatePost);

router.delete("/:id", protect, deletePost);

router.post("/upload-image", protect, upload.single("image"), uploadPostImg);

export default router;

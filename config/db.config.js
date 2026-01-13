import mongoose from "mongoose";

import dotenv from "dotenv"

dotenv.config();

const connectDB = async ()=>{
   
 
try {
  const conn = await mongoose.connect(process.env.DATABASE_BASE_URL)

  console.log(`database connected: ${conn.connection.host}:`);
  
} catch (error) {
  console.error(`Error: ${error.message}`);
  //强制退出Nodejs进程
  process.exit(1)
}
}

connectDB()

export default connectDB
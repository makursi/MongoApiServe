import mongoose from 'mongoose'

//创建数据库地址
const dburl = "mongodb://127.0.0.1:27017/user_center"

//建立数据库连接
mongoose.connect(dburl).then(()=>{
  console.log('成功连接到了MongoDB');
}).catch( err => console.error(`MongoDB 发生错误 :${err}`));

//监听数据库连接错误事件
mongoose.connection.on('error',err=>{
console.log(`mongoDB 发生错误: ${err}`);
})


export default mongoose
import mongoose from 'mongoose' 
const connection=()=>{
 return  mongoose.connect(process.env.MONGO_DB)
}
export {connection}

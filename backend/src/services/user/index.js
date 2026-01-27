import { User } from "../../models/user.models.js"
import { encryptedPassword } from "../../utils/auth.js"

const validateNumber = (phone) => {
  const phoneRegex = /^(97|98)\d{8}$/   
  if (!phoneRegex.test(phone)) {
    return null
  }
  return `+977${phone}`   
}
const getUserByEmailOrNumber=async(email,phone)=>{
   const user=await User.findOne({
    $or:[
        {email,accountVerified:true},
        {phone,accountVerified:true}    
    ]
   })
   return user 
}

const createUser=async(userData)=>{
const user=(await User.create({...userData,password: await encryptedPassword(userData.password)})).toJSON()
    return user 
}

export {validateNumber,getUserByEmailOrNumber,createUser}
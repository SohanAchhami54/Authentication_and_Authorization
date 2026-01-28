import { Errorhandler } from "../../middleware/error.middleware.js"
import {createUser, generateVerificationCode, getUserByEmailOrNumber, sendVerificationCode, validateNumber } from "../../services/user/index.js"

import { AsyncError } from "../../utils/catchAsyncError.js" 

const SignUp=AsyncError(async (req,res,next)=>{
    const {name,email,phone,password,verificationMethod}=req.body 

   
    if(!name || !email || !phone || !password || !verificationMethod) {
        return next(new Errorhandler('All Fields are required',400))
    }

     if (!['email','phone'].includes(verificationMethod)) {
       return next(new Errorhandler('Invalid verification Method.', 400))
    }
    
    const validNumber=validateNumber(phone) 
    if(!validNumber){
        return next(new Errorhandler('Number should be of 10 digits',400))
    }

   const existingUser=await getUserByEmailOrNumber(email,phone)
   if(existingUser) return next(new Errorhandler('User with this email and phone already exists',400))

    const user=await createUser({name,email,phone:validNumber,password})
    
    //verificationCode 
    const {verificationCode,verificationCodeExpire}=generateVerificationCode()
    user.verificationCode=verificationCode 
    user.verificationCodeExpire=verificationCodeExpire
    await user.save()
   
    //send the verificationCode or call service 
   const message=await sendVerificationCode(verificationCode,verificationMethod,email,validNumber,name)
   res.status(200).json({sucess:true,message,data:{userId:user._id,email:user.email,phone:user.phone}})

   // return res.status(200).json({success:true,message:'User Signed In',data:user})
})
export {SignUp}


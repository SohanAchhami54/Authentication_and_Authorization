import { Errorhandler } from "../../middleware/error.middleware.js"
import {allUserEntries, createUser, deleteDuplicateUser, forgetPassToken, generateVerificationCode, getUserByEmailOrNumber, sendVerificationCode, signupAttempt, validateNumber } from "../../services/user/index.js"
import { findUserforgetPass, generateJWTToken, sendEmail, verifyPassword } from "../../utils/auth.js"

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


    const signupAttemptByUser=await signupAttempt(email,validNumber)
    if(signupAttemptByUser.length>=3){
        return next(new Errorhandler('You have exceed maximum number of attempts(3).Please try again after 1 hour',400))
    }
 
 
    const user=await createUser({name,email,phone:validNumber,password})
    
    //verificationCode 
    const {verificationCode,verificationCodeExpire}=generateVerificationCode()
    user.verificationCode=verificationCode 
    user.verificationCodeExpire=verificationCodeExpire
    await user.save()
   
    //send the verificationCode via SMS
   const message=await sendVerificationCode(verificationCode,verificationMethod,email,validNumber,name)
   res.status(200).json({sucess:true,message,data:{userId:user._id,email:user.email,phone:user.phone}})
})


const verifyOTP=AsyncError(async(req,res,next)=>{
   const {email,otp,phone}=req.body 

   const validNumber=validateNumber(phone) 
    if(!validNumber)  return next(new Errorhandler('Number should be of 10 digits',400))
     
      const userEntries=await allUserEntries(email,phone)
      if(!userEntries) return next(new Errorhandler('User not found'))
      if(userEntries.length===0) return next(new Errorhandler('User already verified or not found.',400))
        
      let user
      if(userEntries.length>1) {
         user=userEntries[0]
         await deleteDuplicateUser(user,email,phone)
      }else{
        user=userEntries[0]
      }
     if(user.verificationCode!==Number(otp)) return next(new Errorhandler('Invalid OTP',400))

     const currentTime=new Date()
     const codeExpiredTime=user.verificationCodeExpire
     if(currentTime>codeExpiredTime)  return next(new Errorhandler('OTP Code Expired',400))
     
     user.accountVerified=true 
     user.verificationCode=null 
     user.verificationCodeExpire=null
     await user.save({validateModifiedOnly:true})
     res.status(200).json({success:true,message:'OTP verified Please login.'})

})

const SignIn=AsyncError(async(req,res,next)=>{
    const {email,phone,password}=req.body 

    const validNumber=validateNumber(phone)

    if(!validNumber) return next(new Errorhandler('Enter Valid Number Starting with +977',400))

    if(!password) return next(new Errorhandler('Password must be required',400))
    
    if(!email && !validNumber) return next(new Errorhandler('Email or phone is required',400))
    
    const user=await getUserByEmailOrNumber(email,validNumber)
    if(!user) return next(new Errorhandler('User not found.',400))
    
    const passwordMatched=await verifyPassword(password,user.password)
    if(!passwordMatched) return next(new Errorhandler('Password doesnot match',400))

    const jwtToken=generateJWTToken(user)
    res.cookie('token',jwtToken,{
        httpOnly:true, 
        secure:false, //http can also access this 
        sameSite:'strict', 
        maxAge:24*60*60*1000,
    })
  
    res.status(200).json({success:true,message:'User logged in',data:{id:user._id,name:user.name,email:user.email,phone:user.phone}})
})


const LogOut=AsyncError(async(req,res)=>{
    res.clearCookie('token',{
        httpOnly:true,
        secure:false,
        sameSite:'strict',
    })
    res.status(200).json({success:true,message:'User Logged Out Successfully.'})
})


const getUser=AsyncError(async(req,res,next)=>{
   const user=req.user 
   res.status(200).json({success:true,message:'User Data',user})
})


const forgotPassword=AsyncError(async(req,res,next)=>{
    const user =await findUserforgetPass({email:req.body.email,accountverified:true})
    if(!user) return next(new Errorhandler('User not found.',404))
    
    const {passtoken,tokenexpire} =forgetPassToken()
    
    user.resetPasswordToken=passtoken 
    user.resetPasswordExpire=tokenexpire
    await user.save({validateBeforeSave:false}) // do not check everything.

    const resetPasswordUrl=`${process.env.FRONTEND_URL}/reset/password/${passtoken}`
    const message = `You requested to reset your password.

     Please click the link below to set a new password:
    ${resetPasswordUrl}
    If you did not request a password reset, please ignore this email.`

    try{
      await sendEmail({email:user.email,subject:'Password Reset Request',message})
    }catch(error){
        user.resetPasswordToken=undefined
        user.resetPasswordExpire=undefined
        await user.save({validateBeforeSave:false})
        return next(new Errorhandler(error.message?error.message:'Email could not be Sent.',500))
    }

    res.status(200).json({success:true,message:`Email send to ${user.email} successfully.`})
})
export {SignUp,verifyOTP,SignIn,LogOut,getUser}



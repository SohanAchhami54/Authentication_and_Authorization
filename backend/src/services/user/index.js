import { User } from "../../models/user.models.js"
import { encryptedPassword, getTwilioClient, sendEmail } from "../../utils/auth.js"
import { Errorhandler } from "../../middleware/error.middleware.js"
import crypto from 'crypto'
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
const user=await User.create({...userData,password: await encryptedPassword(userData.password)})
return user 
}



const generateVerificationCode=()=>{
  let result=''
  for(let i=0;i<5;i++){
    result+=Math.floor((Math.random()*9)+1)
  }
  const verificationCode=Number(result)
  const verificationCodeExpire=new Date(Date.now()+5*60*1000)
  
  return {verificationCode,verificationCodeExpire}
}

const signupAttempt=async(email,phone)=>{
  const user=await User.find({
    $or:[
      {phone,accountVerified:false},
      {email,accountVerified:false}
    ]
  })
  return user
}

const allUserEntries=async(email,phone)=>{
  const user=await User.find({
    $or:[
      {email,accountVerified:false},
      {phone,accountVerified:false},
    ]
  }).sort({createdAt:-1})
  return user
}

const deleteDuplicateUser=async(user,email,phone)=>{
    await User.deleteMany({
       _id:{$ne:user._id}, //ne = not equal 
       $or:[
        {phone,accountVerified:false},
        {email,accountVerified:false}
       ]
     })
}

const  forgetPassToken=()=>{

  const randomhex=crypto.randomBytes(20).toString('hex')
  const passtoken= crypto.createHash('sha256').update(randomhex).digest('hex')

  const tokenexpire=new Date(Date.now()+5*60*1000)
  return {passtoken,tokenexpire}
}



const sendVerificationCode=async(verificationCode,verificationMethod,email,phone,name)=>{

      if(verificationMethod==='email'){
        const message=generateEmailTemplate(verificationCode,name)
        sendEmail({email,subject:'Your Verification Code:',message})
        return `Verification code sent to ${name}`

        
      }else if(verificationMethod==='phone'){
         const client=getTwilioClient()
         const codeWithSpace=verificationCode
         await client.messages.create({
          body:`Hello ${name}, Your OTP Code is ${codeWithSpace}. Valid for 5 minutes Thank You`,
          from:process.env.TWILIO_PHONE_NUMBER,
          to:phone
         })
         return `OTP code sent. `
  }else {
    throw new Errorhandler('Invalid verification method',400)
  }
  
} 

function generateEmailTemplate(verificationCode,name){
    return ` 

     <h2>Hello ${name},</h2>

    <p>
      Thank you for signing up. Please use the verification code below to verify your account:
    </p>

    <h1 style="letter-spacing: 4px; color: #2c7be5;">
      ${verificationCode}
    </h1>

    <p>
      This code will expire in 5 minutes.
    </p>

    <p>
      If you did not request this, please ignore this email.
    </p>

    <hr />

    <p style="font-size: 12px; color: #777;">
      © 2026 Authentication
    </p>
    `
}


export {validateNumber,getUserByEmailOrNumber,createUser,generateVerificationCode,sendVerificationCode,signupAttempt,deleteDuplicateUser,allUserEntries,forgetPassToken}



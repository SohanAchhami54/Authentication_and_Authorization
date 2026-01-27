import { User } from "../../models/user.models.js"
import { encryptedPassword, sendEmail } from "../../utils/auth.js"

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

const sendVerificationCode=async(verificationCode,verificationMethod,email,phone)=>{

      if(verificationMethod==='email'){
        const message=generateEmailTemplate(verificationCode)
        sendEmail({email,subject:'Your Verification Code:',message})
        
      }else if(verificationMethod==='phone'){
         const codeWithSpace=verificationCode.toString().toSplit("").join(" ")//35363 become 3 5 3 6 3 

      }
}

function generateEmailTemplate(verificationCode){
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


export {validateNumber,getUserByEmailOrNumber,createUser,generateVerificationCode,sendVerificationCode}



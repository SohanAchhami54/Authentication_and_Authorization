import bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer'
import twilio from 'twilio'
import jwt from 'jsonwebtoken'

const encryptedPassword=async(password)=>{
  const salt=await bcrypt.genSalt(10)
  const hashPassword=await bcrypt.hash(password,salt)
  return hashPassword
}

const sendEmail=async(emailData)=>{
   const transporter=nodemailer.createTransport({
     host:process.env.SMTP_HOST , 
     service:process.env.SMTP_SERVICE,
     port:process.env.SMTP_PORT, //yo entry bata gmail sanga safely talk garney 
     auth:{
       user:process.env.SMTP_MAIL, 
       pass:process.env.SMTP_PASSWORD,
     }
   })
  const options={
    from:process.env.SMTP_MAIL,
    to:emailData.email, 
    subject:emailData.subject,
    html:emailData.message,
  }
   await transporter.sendMail(options)
}


const verifyPassword=async(userPassword,encryptedPassword)=>{
   return await bcrypt.compare(userPassword,encryptedPassword)
}

const generateJWTToken=(user)=>{
  const token= jwt.sign(
    {
      id:user._id
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn:process.env.JWT_EXPIRE || '1d'
    }
  )
  return token
}



const getTwilioClient=()=>{
   if (!process.env.TWILIO_SID || !process.env.TWILIO_TOKEN) {
    throw new Error('Twilio credentials are missing')
  }
  return twilio(process.env.TWILIO_SID,process.env.TWILIO_TOKEN)
}

export {encryptedPassword,sendEmail,getTwilioClient,generateJWTToken,verifyPassword}

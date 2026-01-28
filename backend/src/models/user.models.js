import mongoose from 'mongoose'
const userSchema=new mongoose.Schema({
      name:{
        type:String,
        required:true
      },
        email:{
            type:String,
            required:true,
        },
     password:{
        type:String,
        required:true,
        minlength:[8,"Password must be 8 character long."],
       // maxlength:[32,"Password must not exceed 32 character long."]
    },
    phone:{
        type:String,
        required:true,
        //maxLength:[10,"Phone number must be of 10 character"]
    },
    accountVerified:{
         type:Boolean,
         default:false,
    },
    verificationCode:{
        type:Number,
    },
    verificationCodeExpire:{
        type:Date,
    },
    resetPasswordToken:{
        type:String,
    },
    resetPasswordExpire:{
        type:Date,
    },

},{timestamps:true});
export const User=mongoose.model("User",userSchema);


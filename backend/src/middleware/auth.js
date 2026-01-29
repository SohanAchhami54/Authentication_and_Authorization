import { findUser, verifyToken } from "../utils/auth.js";
import { AsyncError } from "../utils/catchAsyncError.js";
import { Errorhandler } from "./error.middleware.js";

const isProtected=AsyncError(async(req,res,next)=>{
    const {token}=req.cookies 
    if(!token) return next(new Errorhandler('User is not authenticated',400))
    
    const decoded=verifyToken(token)
    console.log('decoded value is:',decoded)
    if(!decoded) return next(new Errorhandler('Unauthorized Token',400))
    
    const userData=await findUser(decoded.id)
    console.log('userdata is:',userData)
    req.user=userData
    next()
})

export {isProtected}
import express from 'express' 
import { forgotPassword, getUser, LogOut, resetPassword, SignIn, SignUp, verifyOTP } from '../../controllers/auth/index.js'
import { isProtected } from '../../middleware/auth.js'
const router=express.Router()

router.post('/signup',SignUp)
router.post('/otpverification',verifyOTP)
router.post('/signin',SignIn)
router.post('/logout',isProtected,LogOut)
router.get('/getuser',isProtected,getUser)
router.post('/reset/forgotpassword',forgotPassword)
router.put('/reset/resetpassword/:token',resetPassword)


export default router

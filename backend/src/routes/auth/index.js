import express from 'express' 
import { LogOut, SignIn, SignUp, verifyOTP } from '../../controllers/auth/index.js'
const router=express.Router()

router.post('/signup',SignUp)
router.post('/otpverification',verifyOTP)
router.post('/signin',SignIn)
router.post('/logout',LogOut)

export default router
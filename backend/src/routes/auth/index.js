import express from 'express' 
import { SignUp, verifyOTP } from '../../controllers/auth/index.js'
const router=express.Router()

router.post('/signup',SignUp)
router.post('/otpverification',verifyOTP)
export default router
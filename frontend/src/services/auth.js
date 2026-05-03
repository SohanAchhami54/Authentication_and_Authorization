import { toast } from "react-toastify"
import Axios from "../api/axios"
import { replace } from "react-router-dom"

const userLogin=async(formData,setUser,setIsAuthenticated,navigate)=>{
     try{
          const {data}= await Axios.post('/api/auth/signin',formData)
          if(data.success){
             localStorage.setItem('token',data.data.token) 
              toast.success(data.message)
              setIsAuthenticated(true)
              setUser(data.data)
              navigate('/')
          }
        }catch(error){
           toast.error(error.response?.data?.message)
        }
}

const userRegister=async(formData,navigate)=>{
   try{
       const {data}=await Axios.post('/api/auth/signup',formData)
        navigate(`/otp/${formData.email}/${formData.phone}`)
      
       if(data.success){
         toast.success('OTP send to your email')
       }
   }catch(error){
      toast.error(error.response?.data?.message)
   }
}

const handleOtp=async(payload,setUser,setIsAuthenticated,navigate)=>{
   try{
       const {data}=await Axios.post('/api/auth/otpverification',payload)
       if(data.success){
         toast.success(data.message) 
         setIsAuthenticated(true) 
         navigate('/login',{replace:true})

       }
   }catch(error){
      toast.error(error.response?.data?.message)
      setIsAuthenticated(null)
   }
}

const  manangeForgotPass=async(email,reset)=>{
  try{
    const {data}=await Axios.post('/api/auth/reset/forgotpassword',{email}) 
    if(data.success){
      toast.success(data.message)
      reset()
    }
  }catch(error){
     toast.error(error.response?.data?.message)
  }
}

const manangeResetPass=async(password,confirmPassword,token,navigate)=>{
   try{
       const {data} = await Axios.put(`/api/auth/reset/resetpassword/${token}`,{password,confirmPassword})
       if(data.success){
         toast.success(data.message)
         navigate('/',{replace:true})
       }
   }catch(error){
      toast.error(error.response?.data?.message)
   }
}

export {userLogin,userRegister,handleOtp, manangeForgotPass,manangeResetPass}
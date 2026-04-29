import { toast } from "react-toastify"
import Axios from "../api/axios"

const userLogin=async(formData,setUser,setIsAuthenticated)=>{
     try{
          const {data}= await Axios.post('/api/auth/signin',formData)
          if(data.success){
             localStorage.setItem('token',data.data.token) 
              toast.success(data.message)
              setIsAuthenticated(true)
              setUser(data.data)
          }
        }catch(error){
           toast.error(error.response?.data?.message)
        }
}

const userRegister=async(formData,navigate)=>{
   try{
       const {data}=await Axios.post('/api/auth/signup',formData)
        navigate(`/otp/${formData.email}/${formData.phone}`)
      //  if(data.success){
      //    toast.success('User Register Successfully')
      //  }
   }catch(error){
      toast.error(error.response?.data?.message)
   }
}


export {userLogin,userRegister}
import { toast } from "react-toastify"
import Axios from "../api/axios"

const userLogin=async(formData)=>{
     try{
          const {data}= await Axios.post('/api/auth/signin',formData)
          if(data.success){
             localStorage.setItem('token',data.data.token) 
              toast.success(data.message)
          }
        }catch(error){
           toast.error(error.response?.data?.message)
        }
}
export {userLogin}
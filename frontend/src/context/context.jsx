import { createContext, useContext, useEffect, useState } from "react";
import Axios from "../api/axios";
import { toast } from "react-toastify";
const AppContext=createContext() 

const AppContextProvider=({children})=>{

    const [isAuthenticated,setIsAuthenticated]=useState(false)
    const [user,setUser]=useState('')
    const [token,setToken]=useState('')
    const [loading,setLoading]=useState(true)
    

 
    const getUserData=async()=>{
        try{
            const {data}=await Axios.get('/api/auth/getuser') 
            if(data.success){
            setUser(data.user)
            setIsAuthenticated(true)
           }
         }catch(error){
            setUser(null)
        }finally{
            setLoading(false)
        }
       
    }

       useEffect(()=>{
        const token=localStorage.getItem('token') 
        if(token){
          setToken(token) 
          getUserData()
        }else{
            setLoading(false)
        }
         
      },[])
 
    
   

    const handleLogout=()=>{
        const confirmed=window.confirm('Are u Sure want to Logout') 
        if(!confirmed) return  
        localStorage.removeItem('token') 
        setUser(null) 
        setIsAuthenticated(false)
        setToken('')
        toast.success('You have been logout')
    }

    const value={isAuthenticated,setIsAuthenticated,user,setUser,handleLogout,loading}
    return (
        <AppContext.Provider value={value}>
           {children}
        </AppContext.Provider>
    )
}

export const useApp=()=>{
    return useContext(AppContext)
}

export default AppContextProvider

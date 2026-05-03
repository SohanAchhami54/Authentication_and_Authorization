import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Forgotpass from './pages/Forgotpass'
import Auth from './pages/Auth'
import Otpverified from './pages/Otpverified'
import Resetpass from './pages/Resetpass'
import Layout from './layout/Layout'
 import { ToastContainer, toast } from 'react-toastify';
import Login from './components/Login'
import Register from './components/Register'
import { useApp } from './context/context'
import NotFound from './pages/NotFound'
const App = () => {
  const {user,loading}=useApp()
  if(loading) return <div>Loading app....</div>
  return (
    <>
    <ToastContainer/>
    <Routes>
    <Route path='/' element={<Layout/>}>
       <Route index element={<Home/>}/>
       <Route path='/otp/:email/:phone' element={<Otpverified/>}/>
    
       <Route path='/password/reset/:token' element={<Resetpass/>}/>
       {!user && (
        <>
         <Route path='/login' element={<Login/>} />
         <Route path='/register' element={<Register/>} />
         <Route path='/password/forgot' element={<Forgotpass/>}/>
        </>
       )}
       {user && (
        <>
         <Route path='/login' element={<Navigate to='/' replace/>} />
         <Route path='/register' element={<Navigate to='/' replace />} />
        </>
       )}
       <Route path='*' element={<NotFound/>}></Route>
       
      
    </Route>
   </Routes>
   </>
  )
}

export default App

import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet,Navigate } from 'react-router-dom'
import { signInStart,signInFail,signInSuccess } from '../redux/user/userSlice'
import Profile from '../pages/Profile'
import SignIn from '../pages/SignIn'


export default function () {
    
    const {error,loading,currentUser} = useSelector((state)=>state.user)
    console.log(currentUser,error,loading)
  return (
    <>
    {currentUser ? (
       <Outlet/>
    ) : (
      <Navigate to='/sign-in'></Navigate>
    )} 
  </>
)
}  

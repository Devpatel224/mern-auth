import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet,Navigate } from 'react-router-dom'

import Profile from '../pages/Profile'
import SignIn from '../pages/SignIn'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setAuthenticate , signInFail} from '../redux/user/userSlice'

export default function () {
    
    const {error,loading,currentUser,authenticated} = useSelector((state)=>state.user)   
    const dispatch = useDispatch()

    useEffect(()=>{
      async function checkAuth() {
            try {
              const res =await axios.get("http://localhost:3000/auth/check",{
                withCredentials:true
              })
              console.log(res.data.authenticated)
              if(res.data){
                dispatch(setAuthenticate(res.data.authenticated))
              }
            } catch (err) {
              if(err.res){
                   dispatch(signInFail(err.res.data.message))
                  dispatch(setAuthenticate(res.data.authenticated))
              }
              else{
                   dispatch(signInFail(err.message))                  
                  dispatch(setAuthenticate(res.data.authenticated))
            }
          }
        }
        checkAuth()
    },[])
      
  return (
    <>
    {currentUser && authenticated == true ? (
       <Outlet/>
    ) : (
      <Navigate to='/sign-in'></Navigate>
    )} 
  </>
)
}  

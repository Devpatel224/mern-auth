import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUserFail,deleteUserStart,deleteUserSuccess } from '../redux/user/userSlice'
import axios from 'axios'

function Profile() {

    const fileRef = useRef()
    const dispatch = useDispatch()
    const {currentUser,error} = useSelector((state)=>state.user)


 
  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      dispatch(deleteUserStart())
      const res = axios
        .delete(`http://localhost:3000/user/delete/${currentUser.data._id}`,{
          withCredentials: true
        })
       
       dispatch(deleteUserSuccess(res)) 
    } catch (error) {
      if(error.response){
        dispatch(deleteUserFail(error.response.data.message))
      }
      else{
        dispatch(deleteUserFail(error.message))
      }
    }
  }
  return (
    <div className='max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col items-center  max-w-3xl mx-auto gap-4'>
        <input type="file" ref={fileRef} hidden accept='image/*'/>
      
        <img src={currentUser.data.profilePicture} alt="profile" className='h-24 w-24 cursor-pointer rounded-full object-cover mt-2' onClick={()=>fileRef.current.click()}/>
        
        <input defaultValue={currentUser.data.username} type="text" id='username'  placeholder='Username' className='bg-sky-100 p-3 rounded-lg w-full max-w-lg  outline-none'/>
        <input defaultValue={currentUser.data.email} type="email" id='email' placeholder='Email' className='bg-sky-100 p-3 rounded-lg w-full max-w-lg  outline-none'/>
        <input type="password" id='password' placeholder='Password' className='bg-sky-100 p-3 rounded-lg w-full max-w-lg  outline-none'/>

        <button className='bg-sky-700 py-3 text-white w-full max-w-lg rounded-lg uppercase hover:opacity-95'>Update</button>
      </form>
      <div className='flex justify-between max-w-lg mx-auto mt-4 '>
        <span onClick={handleSubmit} className='text-red-700 cursor-pointer '>Delete Account</span>
        <span className='text-red-700 cursor-pointer '>Sign Out</span>
      </div>
      <p className='mt-2 text-red-700'>{error? error:""}</p>
    </div>
  )
}

export default Profile
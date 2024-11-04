import React from 'react'
import {GoogleAuthProvider, signInAnonymously, signInWithPopup , getAuth} from 'firebase/auth'
import { app } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { signInFail, signInSuccess } from '../redux/user/userSlice';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

function OAuth() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {error} = useSelector((state)=>state.user)

    const handleGoogleClick = async () => {
        try{
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app)
            const result  = await signInWithPopup(auth,provider)
            const res = await axios.post('http://localhost:3000/auth/google',{
                name : result.user.displayName,
                email:result.user.email,
                photo:result.user.photoURL
            },{withCredentials:true})
         
            dispatch(signInSuccess(res))
            navigate("/")
        }catch(error){
            signInFail("Could Not login with google")
        }
    }
  return (
    <button type='button' onClick={handleGoogleClick} className='bg-red-700 text-white rounded-lg p-3 uppercase hover:bg-red-900'>
        Continue with google
    </button>
  )
}

export default OAuth
import React from 'react'
import { useState } from 'react'
import { Link,useNavigate} from 'react-router-dom'
import axios from 'axios'
import { signInStart,signInFail,signInSuccess } from '../redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import OAuth from '../components/OAuth'

function SignIn() {
 const [formData, setFormData] = useState({})
 const {error,loading,currentUser} = useSelector((state)=>state.user)

//  console.log(error,loading,currentUser)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }


  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      dispatch(signInStart())
      let res = await axios.post(
        "http://localhost:3000/auth/signin",
        formData,{
          withCredentials: true
        }
      )
      console.log(res)
      dispatch(signInSuccess(res))
      if(res.status == 200){
        navigate("/")
      }    
    }
    catch (err) {
      if(err.response){
        dispatch(signInFail(err.response.data.message))
      }
      else{
           dispatch(signInFail(err.message))
      }
    }
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-8'>Sign In</h1>
      <form onSubmit={handleSubmit} action="" className='flex flex-col gap-4 '>
          <input
          className='bg-sky-100 p-3 rounded-lg'
          type="email"
          placeholder='Email'
          id='email'
          name='email'
          onChange={handleChange}
        />

        <input className='bg-sky-100 p-3 rounded-lg'
          type="password"
          placeholder='Password'
          id='password'
          name='password'
          onChange={handleChange}
        />

        <button disabled={loading} className='bg-sky-700 py-3 text-white rounded-lg uppercase hover:opacity-95'>
          {loading ? "Loading..." : "signin"}
        </button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Don't have an account?</p>
        <span className='text-blue-500'><Link to='/sign-up'>Sign up</Link></span>
      </div>
      <p className='text-red-700 mt-5'>{error ? error || 'Something went Wrong' : ""}</p>
    </div>
  )
}

export default SignIn
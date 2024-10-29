import React from 'react'
import { Link } from 'react-router-dom'

function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-8'>Sign Up</h1>
      <form action="" className='flex flex-col gap-4 '>
        <input className='bg-sky-100 p-3 rounded-lg' type="text" placeholder='Username' id='username'/>
        <input className='bg-sky-100 p-3 rounded-lg' type="email" placeholder='Email' id='email'/>
        <input className='bg-sky-100 p-3 rounded-lg' type="password" placeholder='Password' id='password'/>
        <button className='bg-sky-700 py-3 text-white rounded-lg uppercase hover:opacity-95'>Signup</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <span className='text-blue-500'><Link to='/sign-in'>Sign in</Link></span>
      </div>
      </div>
  )
}

export default SignUp
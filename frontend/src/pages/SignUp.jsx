import {useState} from 'react'
import { Link , useNavigate } from 'react-router-dom'
import axios from "axios";


function SignUp() {

  const [formData, setFormData] = useState({})
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })    
  }


  const handleSubmit = async (e)=>{
    e.preventDefault(); 
    

   try{ 
    setLoading(true)
    let res = await axios.post(
      "http://localhost:3000/auth/signup",
      formData,{
        withCredentials:true
      }
    )
    console.log(res)
    if(res.status == 200){
      navigate('/')
    }
    setLoading(false) 
    setError(false)   
  }
    catch(err){
      console.log(err)
      setLoading(false)
      setError(true)
    }    
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-8'>Sign Up</h1>
      <form onSubmit={handleSubmit} action="" className='flex flex-col gap-4 '>
        <input 
        className='bg-sky-100 p-3 rounded-lg' 
        type="text" 
        placeholder='Username' 
        id='username'
        name='username'
        onChange={handleChange}
        />

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
          {loading?"Loading...":"signup"}
        </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <span className='text-blue-500'><Link to='/sign-in'>Sign in</Link></span>
      </div>
      <p className='text-red-700 mt-5'>{error && "Something went Wrong" }</p>
      </div>
  )
}

export default SignUp
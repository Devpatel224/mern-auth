import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


function Header() {
  const {currentUser,authenticated} = useSelector((state)=>state.user)

  
  return (
    <div className='bg-slate-200'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
            <Link to='/'>
            <h1 className='font-bold'>Auth App</h1>
            </Link>
                
            <ul className='flex gap-4 items-center'>
                <Link to='/'>Home</Link>
                <Link to='/about'>About</Link>
                <Link to='/profile'>
                {currentUser && authenticated == true ? (
                  <img src={currentUser.data.profilePicture}  alt="Profile" className='h-10 w-10 rounded-full object-cover'/>
                ):"Sign In"
                }                
                </Link>
            </ul>
        </div>
    </div>
  )
}

export default Header
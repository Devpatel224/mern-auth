import React, { useRef ,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserFail,
  deleteUserStart,
  deleteUserSuccess,
  signOutSuccess,
  setAuthenticate,
  signInSuccess
} from "../redux/user/userSlice";
import axios, { AxiosHeaders } from "axios";
import { useNavigate } from "react-router-dom";


function Profile() {
  const navigate = useNavigate()
  const fileRef = useRef();
  const dispatch = useDispatch();
  const { currentUser, error } = useSelector((state) => state.user);
  const [formdata, setFormdata] = useState({})
  const [filedata, setFiledata] = useState(null)
  const [imagePreview, setImagePreview] = useState(currentUser.data.profilePicture)

  const handleinput = (e)=>{
     setFormdata({
      ...formdata,
      [e.target.name] : e.target.value
     })
  }

  const handlefile = (e)=>{
    const file = e.target.files[0]
    if(file){
      setFiledata(file)
      setImagePreview(URL.createObjectURL(e.target.files[0]))
      // setFormdata({...formdata,profilePicture:file})
    }
  }

  const handleImagetoBack = async (e)=>{
    e.preventDefault()
    const newdata = new FormData();
    newdata.append('image',filedata)
    
    try{
      const res = await axios.post("http://localhost:3000/user/upload",newdata,{
        withCredentials:true,
      })
      console.log(res)
    } catch (error){
      console.log(error)
    }
  }

  const handleUpdate =async (e)=>{
    e.preventDefault()
    try{       
      console.log(formdata)
        const newFormData = new FormData();

        for (const key in formdata) {
          newFormData.append(key,formdata[key])
        }

        if(filedata){
          newFormData.append("profilePicture",filedata)
        }

       const res =await axios.post(`http://localhost:3000/user/update/${currentUser.data._id}`,newFormData,{
        headers: {
          'Content-Type': 'multipart/form-data',  
      },
        withCredentials:true
       })

      console.log(res)
      dispatch(signInSuccess(res))
    }catch(err){
      console.log(err)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(deleteUserStart());
      const res = axios.delete(
        `http://localhost:3000/user/delete/${currentUser.data._id}`,
        {
          withCredentials: true,
        }
      );

      dispatch(deleteUserSuccess(res));
    } catch (error) {
      if (error.response) {
        dispatch(deleteUserFail(error.response.data.message));
      } else {
        dispatch(deleteUserFail(error.message));
      }
    }
  };

  const handleSignout =async (e) => {
    try {
      const res = await axios.get("http://localhost:3000/auth/signout", {
        withCredentials: true,
      });
      
      dispatch(signOutSuccess())
      if(res){
        dispatch(setAuthenticate(false))
      }
      navigate("/sign-in")
    } catch (error) {
      if (error.response) {
        dispatch(deleteUserFail(error.response.data.message));
      } else {
        dispatch(deleteUserFail(error.message));
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleUpdate} className="flex flex-col items-center  max-w-3xl mx-auto gap-4">
        <input type="file" ref={fileRef} hidden accept="image/*" onChange={handlefile}/>

        <img          
          src={imagePreview}
          alt="profile"
          className="h-24 w-24 cursor-pointer rounded-full object-cover mt-2"
          onClick={() => fileRef.current.click()}
        />

        <button onClick={handleImagetoBack} className="bg-sky-700 py-3 text-white w-full max-w-lg rounded-lg uppercase hover:opacity-95">Submit Image</button>

        <input
          defaultValue={currentUser.data.username}
          type="text"
          id="username"
          placeholder="Username"
          className="bg-sky-100 p-3 rounded-lg w-full max-w-lg  outline-none"
          onChange={handleinput}
        />
        <input
          defaultValue={currentUser.data.email}
          type="email"
          id="email"
          placeholder="Email"
          className="bg-sky-100 p-3 rounded-lg w-full max-w-lg  outline-none"
          onChange={handleinput}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-sky-100 p-3 rounded-lg w-full max-w-lg  outline-none"
          onChange={handleinput}
        />

        <button className="bg-sky-700 py-3 text-white w-full max-w-lg rounded-lg uppercase hover:opacity-95">
          Update
        </button>
      </form>

      <div className="flex justify-between max-w-lg mx-auto mt-4 ">
        <span onClick={handleSubmit} className="text-red-700 cursor-pointer ">
          Delete Account
        </span>
        <span onClick={handleSignout} className="text-red-700 cursor-pointer ">
          Sign Out
        </span>
      </div>
      <p className="mt-2 text-red-700">{error ? error : ""}</p>
    </div>
  );
}

export default Profile;

import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    currentUser:null,
    error:false,
    loading:false
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart :(state)=>{
            state.loading = true
        },
        signInSuccess:(state,action)=>{
            state.currentUser = action.payload
            state.loading = false
            state.error = false
        },
        signInFail:(state,action)=>{
            state.loading = false
            state.error = action.payload
        },
        deleteUserStart:(state,action)=>{
            state.loading = true
        },
        deleteUserSuccess : (state,action) => {
            state.currentUser = null;
            state.loading = false
            state.error = false
        },
        deleteUserFail : (state,action) => {
            state.loading = false
            state.error = action.payload
        }
        
    }
})

export  const {signInFail,signInStart,signInSuccess,deleteUserStart,deleteUserSuccess,deleteUserFail} = userSlice.actions

export default userSlice.reducer
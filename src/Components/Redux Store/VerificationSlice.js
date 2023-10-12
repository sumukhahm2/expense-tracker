import { createSlice } from "@reduxjs/toolkit";


const defaultState={
    profileName:'',
    profileURL:'',
    email:'',
    isEmailVerified:false,
    isProfileUpdated:false,
    error:null
}

const verificationSlice=createSlice({
    name:'verification',
    initialState:defaultState,
    reducers:{
        setProfileData(state,action){
          state.profileName=action.payload.name
          state.profileURL=action.payload.url
          state.email=action.payload.email
        },
        setEmailVerified(state){
          state.isEmailVerified=true
        },
        setProfileUpdated(state){
         state.isProfileUpdated=true
        },
        setErrorMessage(state,action){
         state.setErrorMessage=action.payload
        }
    }
})

export const verificationActions=verificationSlice.actions

export default verificationSlice.reducer
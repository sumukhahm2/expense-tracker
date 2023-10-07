import {createSlice} from '@reduxjs/toolkit'
const defaultAuth={
  isAuthenticated:false,
  token:'',
  email:''
}
console.log(defaultAuth.isAuthenticated)
const AuthSlice=createSlice({
  name:'Auth',
  initialState:defaultAuth,
  reducers:{
    login(state){
        state.isAuthenticated=!!state.token
    },
     logout(state){
      state.token=''
        state.isAuthenticated=!!state.token
        
    },
    setToken(state,action){
        state.token=action.payload.token
        state.email=action.payload.email
        
    },
    
  }

})

export const authActions= AuthSlice.actions

export default AuthSlice.reducer
import { createSlice } from "@reduxjs/toolkit";

const defaultTheme={
    inDarkMode:localStorage.getItem('theme')==='dark-mode'?true:false
}

const darkModeSlice=createSlice({
    name:'theme',
    initialState:defaultTheme,
    reducers:{
      changeTheme(state){
        if(localStorage.getItem('theme')==='dark-mode')
        {
            localStorage.removeItem('theme')
            state.inDarkMode=false
        }
       else
       {
        localStorage.setItem('theme','dark-mode')
        state.inDarkMode=true
       }
         console.log(state.inDarkMode)
    }
  } 
})

export const  darkModeAuction=darkModeSlice.actions

export default darkModeSlice.reducer
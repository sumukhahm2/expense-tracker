
import { verificationActions } from "./VerificationSlice"



export const fetchProfileData=()=>{
    return async(dispatch)=>{
        async function fetchUpdatedData(){
            let errorMessage='Something went wrong'
            console.log(localStorage.getItem('email'))
            const response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAu2UHhhGAzmHYd7ZeIIIT_QFH-qiJ9xog',{
              method:'POST',
              body: 
              JSON.stringify(
                {idToken:localStorage.getItem('token')}
                )
        
        
            })
            if(!response.ok)
            {
                throw new Error('fetching profile data failed!')
            }
            const data=await response.json()
            if(data && data.error && data.error.message)
            {
                errorMessage=data.error.message
                dispatch(verificationActions.setErrorMessage(errorMessage))
            }
            console.log(data)
            dispatch(verificationActions.setProfileData({name:data.users[0].displayName,url:data.users[0].photoUrl,email:data.users[0].email}))
            
            if(data.users[0].emailVerified)
             dispatch(verificationActions.setEmailVerified())
          }
          try{
            await fetchUpdatedData()
          }
          catch(error){
            dispatch(verificationActions.setErrorMessage(error))
          }
          
    }
    
}


  export const updateProfileData=(updatedData)=>{
    return async(dispatch)=>{
        async function sendProfileData(){
            let errorMessage='Something Went Wrong'
            const response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAu2UHhhGAzmHYd7ZeIIIT_QFH-qiJ9xog',{
            method:'POST',
            body:JSON.stringify({
                idToken:localStorage.getItem('token'),
                displayName:updatedData.name,
                photoUrl:updatedData.url,
                returnSecureToken:true
            })
        })
        if(!response.ok)
        {
            throw new Error('update profile data failed!')
        }
        const data=await response.json()
        if(data && data.error && data.error.message)
        {
            errorMessage=data.error.message
            dispatch(verificationActions.setErrorMessage(errorMessage))
        }
         dispatch(verificationActions.setProfileData({name:data.users[0].displayName,url:data.users[0].photoUrl}))
         dispatch(verificationActions.setProfileUpdated())
        }
        try{
            await sendProfileData()
        }
        catch(error){
            dispatch(verificationActions.setErrorMessage(error))
        }
       
    }
  }

  export const emailVerification=()=>{
    return async(dispatch)=>{
        async function verifyEmail(){
            let errorMessage='Something went wrong'
            const response= await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAu2UHhhGAzmHYd7ZeIIIT_QFH-qiJ9xog',{
                method:'POST',
                body:JSON.stringify({
                    requestType:"VERIFY_EMAIL",
                    idToken:localStorage.getItem('token')
                })
            })
            if(!response.ok)
            {
                throw new Error('Email verification failed!')
            }
            const data=await response.json()
            if(data && data.error && data.error.message)
            {
              errorMessage=data.error.message;
              dispatch(verificationActions.setErrorMessage(errorMessage))
              
            }
            else if(data.email)
            {
                alert(' You might have recieved a verification link . Click on it to verify.')
            }
        }
        try{
            await verifyEmail()
        }
        catch(error){
            dispatch(verificationActions.setErrorMessage(error))
        }
       
    }
  }
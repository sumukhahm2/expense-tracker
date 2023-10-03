import React,{Fragment,useState,useEffect} from'react'
import UpdateProfile from './UpdateProfile';
import ReactDOM from 'react-dom'
import { Container } from 'react-bootstrap';
import './ProfileForm.css'
import Verify from '../../logo/check-mark.png'
import Profile from '../../logo/profile.png'



const BackDrop=(props)=>{
    return(
        <div className='backdrop' onClick={props.onConfirm}></div>
    );
}

const OverLay=(props)=>{
    const [update,setUpdate]=useState(false)
    const [emailVerified,setEmailVerified]=useState()
    const [updatedData,setData]=useState({
        name:' Not Updated', 
        photoUrl:' Not Updated',
        email:'Not Updated'
    })
    const [error,setError]=useState()
    useEffect(()=>{
      async function fetchUpdatedData(){
        const response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAu2UHhhGAzmHYd7ZeIIIT_QFH-qiJ9xog',{
          method:'POST',
          body: 
          JSON.stringify(
            {idToken:localStorage.getItem('token')}
            )
    

        })
        const data=await response.json()
        setData({name:data.users[0].displayName,photoUrl:data.users[0].photoUrl,email:data.users[0].email})
        if(data.users[0].emailVerified)
         setEmailVerified(true)
      }
      fetchUpdatedData()
    },[])
   
    const dataHandler=(item)=>{
      setData({
        name:item.displayName,
        photoUrl:item.photoUrl,
        email:localStorage.getItem('email')
      })
      props.onConfirmUpdate()
    }
    const updateProfilePage=(event)=>{
     event.preventDefault()
      setUpdate(true)
    }
   const inputFileHandler=(event)=>{
    event.preventDefault()
     console.log(event.target.files[0].name)
     /* const uploadedImage=storage().ref(`files/${event.target.files[0].name}`).put(event.target.files[0])
      uploadedImage.on(
        'state_changed',
        (snapshot)=>{

        },
        (error)=>console.log(error),
        ()=>{
            storage().ref('files').child(event.target.files[0].name).getDownloadURL().then((url)=>{
                console.log(url)
            })
        }
      )*/
   }
   const verifyEmailHandler=async(event)=>{
    event.preventDefault()
    let errorMessage='Authentication error'
    const response= await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAu2UHhhGAzmHYd7ZeIIIT_QFH-qiJ9xog',{
        method:'POST',
        body:JSON.stringify({
            requestType:"VERIFY_EMAIL",
            idToken:localStorage.getItem('token')
        })
    })
    const data=await response.json()
    if(data && data.error && data.error.message)
    {
      errorMessage=data.error.message;
      setError(errorMessage)
    }
    else if(data.email)
    {
        alert(' You might have recieved a verification link . Click on it to verify.')
    }

    
    console.log(data)
   }
   
    return(
        <div className='overlay'>
            <Container className='border border-dark'>
           {updatedData && !update && <Container>
                <h1 className='text-center mb-5' style={{color:'green'}}><img src={Profile} alt='' style={{width:'60px'}}/>Profile Information</h1>
                <Container className='text-center'>
                  <span className='rounded-circle upload-photo '>
                <i className="fa-regular fa-image" style={{color: '#b6e3f2'}}></i></span>
             <span className='edit-photo-span rounded-circle'> <label for='input-file'>
                <i className="fa-regular fa-pen-to-square edit-photo"></i></label>
                <input type='file' id='input-file' onChange={inputFileHandler}/></span>
                  
                  </Container>
                <h4 className='mb-5 mt-5'><i className="fa-solid fa-address-book" style={{color:'orange'}}></i> Name: {updatedData.name}</h4>
                <h4 className='mb-5'><i className="fa-solid fa-globe" style={{color:'blue'}}></i> Profile URL: {updatedData.photoUrl}</h4>
                <h4 className='mb-5'><i className="fa-solid fa-envelope"></i>   
                 Email: {updatedData.email} 
                {!emailVerified?<a href='/' onClick={verifyEmailHandler}>verify</a>:<img src={Verify} alt='' style={{width:'30px'}}/>}</h4> 
                {error && <p>{error}</p>}
            </Container>}
            {!update && <a href='/' onClick={updateProfilePage}>Update Profile</a>}
           {update && <UpdateProfile profileData={dataHandler}/>}
           </Container>
        </div>
    );
}
const ProfileForm=(props)=>{
    return(
     <Fragment>
       {ReactDOM.createPortal(<BackDrop onConfirm={props.onConfirm}/>,document.getElementById('backdrop'))}
       {ReactDOM.createPortal(<OverLay/>,document.getElementById('overlay'))}
     </Fragment>
    );
}

export default ProfileForm 
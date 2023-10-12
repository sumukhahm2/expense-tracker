import React,{Fragment,useState} from'react'
import UpdateProfile from './UpdateProfile';
import ReactDOM from 'react-dom'
import { Container } from 'react-bootstrap';
import './ProfileForm.css'
import Verify from '../../logo/check-mark.png'
import Profile from '../../logo/profile.png'
import { useSelector,useDispatch } from 'react-redux';
import { emailVerification } from '../Redux Store/FetchProfileData';

const BackDrop=(props)=>{
    return(
        <div className='backdrop' onClick={props.onConfirm}></div>
    );
}

const OverLay=(props)=>{
  const [update,setUpdate]=useState(false)
    const verification=useSelector((state)=>state.verify)
    const dispatch=useDispatch()
    const updateProfilePage=(event)=>{
     event.preventDefault()
      setUpdate(true)
    }
   
   const verifyEmailHandler=async(event)=>{
    event.preventDefault()
    dispatch(emailVerification())
   }
   
    return(
        <div className='overlay'>
            <Container className='border border-dark'>
           { !update && <Container>
                <h1 className='text-center mb-5' style={{color:'green'}}><img src={Profile} alt='' style={{width:'60px'}}/>Profile Information</h1>
                <Container className='text-center'>
                  <span className='rounded-circle upload-photo '>
                <i className="fa-regular fa-image" style={{color: '#b6e3f2'}}></i></span>
             <span className='edit-photo-span rounded-circle'> <label for='input-file'>
                <i className="fa-regular fa-pen-to-square edit-photo"></i></label>
                <input type='file' id='input-file' /></span>
                  
                  </Container>
                <h4 className='mb-5 mt-5'><i className="fa-solid fa-address-book" style={{color:'orange'}}></i> Name: {verification.profileName}</h4>
                <h4 className='mb-5'><i className="fa-solid fa-globe" style={{color:'blue'}}></i> Profile URL: {verification.profileURL}</h4>
                <h4 className='mb-5'><i className="fa-solid fa-envelope"></i>   
                 Email: {verification.email} 
                {!verification.isEmailVerified?<a href='/' onClick={verifyEmailHandler}>verify</a>:<img src={Verify} alt='' style={{width:'30px'}}/>}</h4> 
                {verification.error && <p>{verification.error}</p>}
            </Container>}
            {!update && <a href='/' onClick={updateProfilePage}>Update Profile</a>}
           {update && <UpdateProfile />}
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
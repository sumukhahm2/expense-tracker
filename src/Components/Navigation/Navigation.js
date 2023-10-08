import React,{Fragment,useState,useEffect} from 'react'
import { Container,Nav,Navbar,Form,Button } from 'react-bootstrap';
import ExpenseImage from '../../logo/budget.png'
import { useSelector,useDispatch } from 'react-redux';
import {authActions} from '../Redux Store/AuthSlice';
import './Navigation.css'
import ProfileForm from '../Profile/ProfileForm';
import { NavLink } from 'react-router-dom';
import { darkModeAuction } from '../Redux Store/DarkModeSlice';

const Navigation=(props)=>{
  const [isProfileUpdated,setIsProfileUpdated]=useState(false)

  const [isProfile,setProfile]=useState(false)
  const auth=useSelector((state)=>state.auth.isAuthenticated)
  const token=useSelector((state)=>state.auth.token)
  const isDarkMode=useSelector((state)=>state.darkmode.inDarkMode)
   const dispatch=useDispatch()
  useEffect(()=>{
    async function fetchUpdatedData(){
      let response
      
      if (localStorage.getItem('token')) {
       response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAu2UHhhGAzmHYd7ZeIIIT_QFH-qiJ9xog',{
        method:'POST',
        body: 
        JSON.stringify(
          {idToken:localStorage.getItem('token')}
          )
  

      })
      const data=await response.json()
      if(data && data.error && data.error.message)
      {

      }
     else if(data.users[0].displayName!==undefined && data.users[0].photoUrl!==undefined)
      setIsProfileUpdated(true)
     
    }}
    fetchUpdatedData()
   
  },[])
  const logoutHandler=()=>{
   dispatch(authActions.logout())
   localStorage.removeItem('token')
        localStorage.removeItem('email')
   console.log(token)
  }
  const profileHandler=()=>{
   
      setProfile((prev)=>!prev)
    
  }
  const onConfirmUpdate=(data)=>{
   console.log(data)
    setIsProfileUpdated(true)
    
  }
  const switchThemeHandler=(event)=>{
    event.preventDefault()
  
    dispatch(darkModeAuction.changeTheme())
  }
    return(
      <Fragment>
      <Navbar bg="dark" data-bs-theme="dark" className='' expand='md'>
        <Container >
          <Navbar.Brand href="#home"><img src={ExpenseImage} style={{width:'50px'}} alt=''/>Expense Tracker</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />  
          <Navbar.Collapse id="basic-navbar-nav">  
          <Nav className="me-auto"  >
            <NavLink to={!auth?'/login':'/home'} className='mx-3 nav-link'>{!auth?'Login':'Home'}</NavLink>
           {auth && <NavLink  to='/expenselist' className='mx-3 nav-link'>ExpenseList</NavLink>}
           {auth && <NavLink to='' className='mx-3 nav-link' onClick={logoutHandler}>Logout</NavLink>}
           {auth && <NavLink to='' className='mx-3 nav-link' onClick={profileHandler}>{!isProfileUpdated?'Complete Your Profile':'Profile'}</NavLink>}
           <Button onClick={switchThemeHandler} className='mx-3 nav-link'>{isDarkMode?<span><i class="fa-solid fa-sun" style={{color: '#d4ea34'}}></i> Light Mode</span>
           :<span><i class="fa-regular fa-moon" style={{color: '#cf642a'}}></i> Dark Mode</span>}</Button>
           {isProfile && <ProfileForm onConfirm={profileHandler} onConfirmUpdate={onConfirmUpdate}/>}
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </Fragment>

    );
}

export default Navigation
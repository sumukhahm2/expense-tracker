import React,{Fragment,useContext,useState,useEffect} from 'react'
import { Container,Nav,Navbar } from 'react-bootstrap';
import ExpenseImage from '../../logo/budget.png'
import './Navigation.css'
import Context from '../../store/Context';
import ProfileForm from '../Profile/ProfileForm';
const Navigation=(props)=>{
  const [isProfileUpdated,setIsProfileUpdated]=useState(false)
  const ctx=useContext(Context)
  const [isProfile,setProfile]=useState(false)
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
    ctx.logout()
  }
  const profileHandler=()=>{
   
      setProfile((prev)=>!prev)
    
  }
  const onConfirmUpdate=(data)=>{
   console.log(data)
    setIsProfileUpdated(true)
    
  }
    return(
      <Fragment>
      <Navbar bg="dark" data-bs-theme="dark" className=''>
        <Container >
          <Navbar.Brand href="#home"><img src={ExpenseImage} style={{width:'50px'}} alt=''/>Expense Tracker</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link className='mx-3'>Home</Nav.Link>
            <Nav.Link  className='mx-3'>Features</Nav.Link>
           {ctx.login && <Nav.Link className='mx-3' onClick={logoutHandler}>Logout</Nav.Link>}
           {ctx.login && <Nav.Link  className='mx-3' onClick={profileHandler}>{!isProfileUpdated?'Complete Your Profile':'Profile'}</Nav.Link>}
           {isProfile && <ProfileForm onConfirm={profileHandler} onConfirmUpdate={onConfirmUpdate}/>}
          </Nav>
        </Container>
      </Navbar>
      </Fragment>

    );
}

export default Navigation
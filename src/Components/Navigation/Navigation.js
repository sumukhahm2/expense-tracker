import React,{Fragment,useContext,useState} from 'react'
import { Container,Nav,Navbar } from 'react-bootstrap';
import ExpenseImage from '../../logo/budget.png'
import './Navigation.css'
import Context from '../../store/Context';
import ProfileForm from '../Profile/ProfileForm';
const Navigation=(props)=>{
  const ctx=useContext(Context)
  const [isProfile,setProfile]=useState(false)
  const logoutHandler=()=>{
    ctx.logout()
  }
  const profileHandler=()=>{
   
      setProfile((prev)=>!prev)
    
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
           {ctx.login && <Nav.Link  className='mx-3' onClick={profileHandler}>Complete Your Profile</Nav.Link>}
           {isProfile && <ProfileForm />}
          </Nav>
        </Container>
      </Navbar>
      </Fragment>

    );
}

export default Navigation
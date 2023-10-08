import React,{Fragment,useRef,useState} from 'react'
import { Button, Container,Form, NavLink, Row,Col, Spinner} from 'react-bootstrap';
import {useSelector,useDispatch} from 'react-redux'
import { authActions } from './Redux Store/AuthSlice';
import Image1 from '../logo/5355919.jpg'

import './AuthForm.css'
import { useNavigate } from 'react-router-dom';

const AuthForm=()=>{
    const emailRef=useRef()
    const resetPasswordRef=useRef()
    const passwordRef=useRef()
    const ConfirmPasswordRef=useRef()
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const [error,setError]=useState('')
    const [inLogin,setInLogin]=useState(false)
    const [passwordReset,setPasswordReset]=useState(false)
    const [loader,setLoader]=useState(false)
    const navigate=useNavigate()
   const dispatch=useDispatch()
   const auth=useSelector((state)=>state.auth.isAuthenticated)
   
    const passwordHandler=(event)=>{
       
       setPassword(event.target.value)
    }
    const confirmPasswordHandler=(event)=>{
        
        setConfirmPassword(event.target.value)
        
    }
   
    const authFormSubmitHandler=async(event)=>{
       event.preventDefault()
       console.log('form submission')
       
       setLoader(true)
       let errorMessage='Authentication Error'
       let response
       if(inLogin)
       {
        console.log('in login')
          response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAu2UHhhGAzmHYd7ZeIIIT_QFH-qiJ9xog',{
          method:'POST',
          body:JSON.stringify({
            email:emailRef.current.value,
            password:passwordRef.current.value,
            returnSecureToken:true
          }),
          headers:{
            'Content-Type': 'application/json'
         }
         })
          
       }
       else{
        response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAu2UHhhGAzmHYd7ZeIIIT_QFH-qiJ9xog',{
          method:'POST',
          body:JSON.stringify({
            email:emailRef.current.value,
            password:passwordRef.current.value,
            returnSecureToken:true
          }),
          headers:{
            'Content-Type': 'application/json'
         }
         })
       }
        if(!inLogin && password!==confirmPassword)
        {
          errorMessage='Password Missmatch Kindly Enter Password again'
          setError(errorMessage)
        }
        else{
          const data=await response.json()
            if(data && data.error && data.error.message)
            {
             errorMessage=data.error.message
             setError(errorMessage)
            }
            else if(data.idToken)
            {
              console.log(data)
             dispatch(authActions.setToken({token:data.idToken,email:data.email}))
             dispatch(authActions.login())
             localStorage.setItem('token',data.idToken)
             localStorage.setItem('email',data.email)
            
            
            }
        }
        setLoader(false)
      
    
    }
    const switchModeHandler=(event)=>{
      event.preventDefault()
      
      setInLogin((prev)=>!prev)
     }
     const forgotPasswordHandler=(event)=>{
      event.preventDefault()
      
      setPasswordReset(true)
      

     }
     const submitResetPasswordHandler=async(event)=>{
      event.preventDefault()
      setLoader(true)
      let errorMessage='Authentication Error'
      const response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAu2UHhhGAzmHYd7ZeIIIT_QFH-qiJ9xog',{
        method:'POST',
        body:JSON.stringify({
          requestType:'PASSWORD_RESET',
          email:resetPasswordRef.current.value
        })
      })
      const data= await response.json()
      if(data && data.error && data.error.message)
      {
        errorMessage=data.error.message
        setError(errorMessage)
        alert(errorMessage)
      }
      else if(data.email) 
      {
        alert('Password reset link sent to your email')
        console.log(data)
      }
      setLoader(false)

     }
    return(
     <Fragment>
        <Container fluid className=''>
       
          <Row>
            <Col className='col-6' >
              <Form className='border border-dark shadow-lg m-5 rounded' onSubmit={authFormSubmitHandler}>
                <Container fluid className='text-center fw-bold border-bottom border-dark ' style={{backgroundColor:'#2482DF',height:'3rem'}}>
                <i className="fa-solid fa-lock lock" style={{color:'#ffffff'}}></i>
               {!passwordReset && <Form.Text className='m-1' style={{color:'white',fontSize:'30px'}}>{inLogin?'LogIn':'SignUp'}</Form.Text>}
                {passwordReset && <Form.Text className='m-1' style={{color:'white',fontSize:'30px'}}>Password Reset</Form.Text>}
                </Container>
                
       {!passwordReset && <Form.Group className="mb-3  m-3 fw-bold">
        <Form.Label>Email Id</Form.Label>
        <Form.Control placeholder="Enter Your Email"  type='email'required ref={emailRef}  />
      </Form.Group>}
      {!passwordReset && <Form.Group className="mb-3  m-3 fw-bold">
        <Form.Label>Password</Form.Label>
        <Form.Control placeholder="Enter Password" type='password'required ref={passwordRef} onChange={passwordHandler} />
      </Form.Group>}
     {!inLogin && !passwordReset && <Form.Group className="mb-3  m-3 fw-bold">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control placeholder="Confirm Password" type='password'  required ref={ConfirmPasswordRef} onChange={confirmPasswordHandler}/>
      </Form.Group> }
      {error && <p>{error}</p>}
      {!passwordReset && !loader &&<Form.Group className="mb-3  m-3">
        <Button type='submit'>{inLogin?'LogIn':'SignUp'}</Button>
      </Form.Group> }
      {loader && <Container className='text-center'><Spinner animation="border" variant="primary" className='text-center justify'/> </Container>}
     
      <Form.Group className="mb-3  m-3">
      {inLogin && !passwordReset && <a href='' onClick={forgotPasswordHandler} >forgot password?</a>}
      </Form.Group>
      {!passwordReset && <Form.Group className="mb-3  m-3">
      <Form.Label>{inLogin?'Dont Have An Account':'Already Have An Account?'}</Form.Label>
        <a href='' onClick={switchModeHandler}>{inLogin?'SignUp':'LogIn'}</a> 
      </Form.Group>}
      {passwordReset && <Form.Group className="mb-3  m-3 fw-bold">
        <Form.Label>Email Id</Form.Label>
        <Form.Control placeholder="Enter Your Email"  type='email'required ref={resetPasswordRef}  />
      </Form.Group>}
      {passwordReset && !loader && <Form.Group className="mb-3  m-3">
      <Button type='submit' onClick={submitResetPasswordHandler}>Submit</Button>
    </Form.Group>}
      </Form>
     
          
      </Col>
            <Col className='col-6 text-center'>
              <img src={Image1}  className='image' alt=''/>
            </Col>
          </Row> 
        </Container>
     </Fragment>

    );
}

export default AuthForm
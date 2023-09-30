import React,{Fragment,useRef,useState,useContext} from 'react'
import { Button, Container,Form, NavLink, Row,Col } from 'react-bootstrap';
import Context from '../store/Context';
import Image1 from '../logo/5355919.jpg'
import './AuthForm.css'
const AuthForm=()=>{
    const emailRef=useRef()
    const passwordRef=useRef()
    const ConfirmPasswordRef=useRef()
    const ctx=useContext(Context)
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const [error,setError]=useState('')
    const [inLogin,setInLogin]=useState(false)
    const passwordHandler=(event)=>{
       
       setPassword(event.target.value)
    }
    const confirmPasswordHandler=(event)=>{
        
        setConfirmPassword(event.target.value)
        
    }
   
    const authFormSubmitHandler=async(event)=>{
       event.preventDefault()
       let errorMessage='Authentication Error'
       let response
       if(inLogin)
       {
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
             ctx.setToken({token:data.idToken,email:data.email})
                   
            }
        }
        
         
          
       
       
       
      
    }
    const switchModeHandler=(event)=>{
      event.preventDefault()
      setInLogin((prev)=>!prev)
     }
    return(
     <Fragment>
        <Container fluid className=''>
          <Row>
            <Col className='col-6' >
              <Form className='border border-dark shadow-lg m-5 rounded' onSubmit={authFormSubmitHandler}>
                <Container fluid className='text-center fw-bold border-bottom border-dark ' style={{backgroundColor:'#2482DF',height:'3rem'}}>
                <i className="fa-solid fa-lock lock" style={{color:'#ffffff'}}></i>
                <Form.Text className='m-1' style={{color:'white',fontSize:'30px'}}>{inLogin?'LogIn':'SignUp'}</Form.Text>
                </Container>
                
        <Form.Group className="mb-3  m-3 fw-bold">
        <Form.Label>Email Id</Form.Label>
        <Form.Control placeholder="Enter Your Email"  type='email'required ref={emailRef}  />
      </Form.Group>
      <Form.Group className="mb-3  m-3 fw-bold">
        <Form.Label>Password</Form.Label>
        <Form.Control placeholder="Enter Password" type='password'required ref={passwordRef} onChange={passwordHandler} />
      </Form.Group>
     {!inLogin && <Form.Group className="mb-3  m-3 fw-bold">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control placeholder="Confirm Password" type='password'  required ref={ConfirmPasswordRef} onChange={confirmPasswordHandler}/>
      </Form.Group> }
      {error && <p>{error}</p>}
      <Form.Group className="mb-3  m-3">
        <Button type='submit'>{inLogin?'LogIn':'SignUp'}</Button>
      </Form.Group> 
      <Form.Group className="mb-3  m-3">
      <Form.Text>{inLogin?'Dont Have An Account':'Already Have An Account?'}</Form.Text>
        <a href='' onClick={switchModeHandler}>{inLogin?'SignUp':'LogIn'}</a> 
      </Form.Group>
      
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
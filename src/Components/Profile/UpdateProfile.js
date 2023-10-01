import React,{Fragment,useRef} from 'react'
import { Form,Container,Button } from 'react-bootstrap';
const UpdateProfile=(props)=>{
    const fullNameRef=useRef()
    const urlRef=useRef()
    const profileUpdateHandler=async()=>{
        const response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAu2UHhhGAzmHYd7ZeIIIT_QFH-qiJ9xog',{
            method:'POST',
            body:JSON.stringify({
                idToken:localStorage.getItem('token'),
                displayName:fullNameRef.current.value,
                photoUrl:urlRef.current.value,
                returnSecureToken:true
            })
        })
        const data=await response.json()
        console.log(data)
        props.profileData(data)
    }
    return(
       <Fragment>
          <Form onSubmit={profileUpdateHandler}>
          <Container  fluid>
            <Form.Text className='mb-2'>
               <h2 style={{color:'orange'}}> <i class="fa-solid fa-user"></i> Update Your Profile</h2>
            </Form.Text>
            </Container>
            <Form.Group className='mb-2 fw-bold'>
            <Form.Label><i class="fa-solid fa-address-book"></i> Full Name</Form.Label>
                <Form.Control type='text' ref={fullNameRef}/>
            </Form.Group>
            <Form.Group className='mb-2 fw-bold'>
                <Form.Label><i class="fa-solid fa-globe"></i> Profile Photo URL</Form.Label>
                <Form.Control type='text' ref={urlRef}/>
            </Form.Group>
            <Form.Group className='mb-2 fw-bold'>
                <Button type='submit' style={{backgroundColor:'orange'}}>Update</Button>
            </Form.Group>
          </Form>
       </Fragment>
    );
}

export default UpdateProfile
import React,{Fragment,useRef} from 'react'
import { Form,Container,Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { updateProfileData } from '../Redux Store/FetchProfileData';
const UpdateProfile=(props)=>{
    const fullNameRef=useRef()
    const urlRef=useRef()
    const dispatch=useDispatch()
    const profileUpdateHandler=()=>{
        const updatedData={
            name:fullNameRef.current.value,
            url:urlRef.current.value
        }
       dispatch(updateProfileData(updatedData))
       
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
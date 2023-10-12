
import React,{Fragment,useRef,useState} from 'react'
import { Button, Form,NavLink,Row,Col,Container} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { sendExpenseData } from '../Redux Store/FetchExpenseDataActions';
import { Nav } from 'react-bootstrap';
import './Expense.css'
const ExpenseForm=(props)=>{
 const dropdownRef=useRef()
 const amountRef=useRef()
 const descriptionref=useRef()
 const [error,setError]=useState('')
 const [isSwitch,setSwitch]=useState(false)
 const dispatch=useDispatch()

 const switchModeCreditHandler=()=>{
   setSwitch(true)
 }
 const switchModeDebitHandler=()=>{
  setSwitch(false)
 }
  const debitFormSubmitHandler=(event)=>{
   event.preventDefault()
   const inputDatas={
    type:'DEBIT',
    amount:amountRef.current.value,
    description:descriptionref.current.value,
    catogory:dropdownRef.current.value
   }
    dispatch(sendExpenseData(inputDatas))
   props.isConfirm()
   
  }
  const creditFormSubmitHandler=(event)=>{
    event.preventDefault()
    const inputDatas={
     type:'CREDIT',
     amount:amountRef.current.value,
     description:descriptionref.current.value,
     catogory:dropdownRef.current.value
    }
     dispatch(sendExpenseData(inputDatas))
    props.isConfirm()
  }
  
    return(
      <Fragment>
        <Container style={{backgroundColor:'#D3ED43',height:'300px'}} className='border border-dark'>
            
                <Row style={{backgroundColor:'#83F1BF'}} >
                    <Col className='col-6 text-center border border-right'>
                      <Nav.Link  onClick={switchModeCreditHandler} className='nav-links'>Credit(Income)</Nav.Link>
                    </Col>
                    
                    <Col className='col-6 text-center'>
                    <Nav.Link  className='nav-links' onClick={switchModeDebitHandler}>Debit(Expense)</Nav.Link>
                    </Col>
                </Row>
                <Form onSubmit={isSwitch?creditFormSubmitHandler:debitFormSubmitHandler}>
                  <Row className='text-center'><h2>{isSwitch?'Credit Entries':'Debit Entries'}</h2></Row>
                <Row className='text-center'>
    
                    <Col className='col-4'>
                    <h5 className='m-2'>Amount</h5>
                    </Col>
                    <Col className='col-4'>
                    <h5 className='m-2'>Catogory</h5> 
                    </Col>
                </Row>
                <Row className='text-center'>
                    <Col className='col-4'>
                    <input type='number'className='m-2' ref={amountRef} required/>
                    </Col>
                    <Col className='col-4 '>
                        <Form.Control as="select" ref={dropdownRef} className=' w-75' style={{marginLeft:'10px'}} required>
                        <option value='' selected>Select Catogory</option>
                            <option value="Food">Food</option>
                            <option value="Shoping">Shoping</option>
                            <option value="Movie">Movie</option>
                            <option value="Buy Grocery">Buy Grocery</option>
                            <option value="Others">Others</option>
                        </Form.Control>
                    </Col>
                    <Col className='col-1'>
                      <Button className=' btn btn-success btn-circle btn-md' type='submit'><i class="fa-solid fa-check" style={{color:'#fcfcfd'}}></i></Button>
                    </Col>
                    {error && <p>{error}</p>}
                    <Row className='text-center'>
                    <h5 className='m-2'>Description</h5>
                    </Row>
                    <Row >
                    <textarea type='text' className='m-2 'ref={descriptionref}  style={{backgroundColor:'#D3ED43',height:'92px',border:'none'}} required/>
                    </Row>
                </Row>
            </Form>
        </Container>
      </Fragment>
    );
}
export default ExpenseForm
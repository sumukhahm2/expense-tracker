
import React,{Fragment,useRef,useState} from 'react'
import { Button, Dropdown, Form,NavLink,Row,Col,Container} from 'react-bootstrap';
import { useSelector,useDispatch } from 'react-redux';
import { expensesActions } from '../Redux Store/StoreExpenseSlice';

const ExpenseForm=(props)=>{

 const dropdownRef=useRef()
 const amountRef=useRef()
 const descriptionref=useRef()
 const [error,setError]=useState('')
 const dispatch=useDispatch()
  const expenseFormSubmitHandler=async(event)=>{
   event.preventDefault()
  let errorMessage='Something went wrong'
   const response= await fetch(`https://expense-tracker-e1878-default-rtdb.firebaseio.com/${localStorage.getItem('email').split('@')[0]}.json`,{
    method:'POST',
    body:JSON.stringify({
      amount:amountRef.current.value,
      description:descriptionref.current.value,
      catogory:dropdownRef.current.value
    })

   })
   const data=await response.json()
   if(data && data.error && data.error.message)
   {
     errorMessage=data.error.message
     setError(errorMessage)
   }
   else{
    console.log(data)
     dispatch(expensesActions.addExpense({
      amount:amountRef.current.value,
      description:descriptionref.current.value,
      catogory:dropdownRef.current.value
    }))
    dispatch(expensesActions.setAmount())
   }
   props.isConfirm()
   
  }
    return(
      <Fragment>
        <Container style={{backgroundColor:'#D3ED43',height:'300px'}} className='border border-dark'>
            <Form onSubmit={expenseFormSubmitHandler}>
                <Row style={{backgroundColor:'#83F1BF'}} >
                    <Col className='col-5 text-center '>
                      <NavLink href='/credit' className=''>Credit(Income)</NavLink>
                    </Col>
                    <Col className='col-5 text-center'>
                    <NavLink href='/debit'>Debit(Expense)</NavLink>
                    </Col>
                </Row>
                <Row>
                    <Col className='col-6'>
                    <h5 className='m-2'>Amount</h5>
                    </Col>
                    
                    <Col className='col-6'>
                    <h5 className='m-2'>Catogory</h5> 
                    </Col>
                    
                </Row>
                <Row>
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
                    <Col className='col-4'>
                      <Button className=' btn btn-success btn-circle btn-md' type='submit'><i class="fa-solid fa-check" style={{color:'#fcfcfd'}}></i></Button>
                    </Col>
                    {error && <p>{error}</p>}
                    <Row className='text-center'>
                    <h5 className='m-2'>Description</h5>
                    </Row>
                    <Row >
                    <textarea type='text' className='m-2 'ref={descriptionref}  style={{backgroundColor:'#D3ED43',height:'138px',border:'none'}} required/>
                    </Row>
                </Row>
            </Form>
        </Container>
      </Fragment>
    );


}


export default ExpenseForm

import React,{Fragment,useRef,useState} from 'react'
import { Button, Dropdown, Form,NavLink,Row,Col,Container} from 'react-bootstrap';

const ExpenseForm=(props)=>{

 const dropdownRef=useRef()
 const amountRef=useRef()
 const descriptionref=useRef()
  const expenseFormSubmitHandler=(event)=>{
   event.preventDefault()
    props.getData({
      amount:amountRef.current.value,
      description:descriptionref.current.value,
      catogory:dropdownRef.current.value
    }) 
  }
    return(
      <Fragment>
        <Container>
            <Form onSubmit={expenseFormSubmitHandler}>
                <Row>
                    <Col className='col-6'>
                      <NavLink href='/credit'>Credit(Income)</NavLink>
                    </Col>
                    <Col className='col-6'>
                    <NavLink href='/debit'>Debit(Expense)</NavLink>
                    </Col>
                </Row>
                <Row>
                    <Col className='col-4'>
                    <h5 className='m-2'>Amount</h5>
                    </Col>
                    <Col className='col-4'>
                    <h5 className='m-2'>Description</h5>
                    </Col>
                    <Col className='col-4'>
                    <h5 className='m-2'>Catogory</h5> 
                    </Col>
                </Row>
                <Row>
                    <Col className='col-3'>
                    <input type='number'className='m-2' ref={amountRef}/>
                    </Col>
                    <Col className='col-3'>
                    <input type='text' className='m-2'ref={descriptionref}/>
                    </Col>
                    <Col className='col-3'>
                    <Form.Label>Select Catogory </Form.Label>
                        <Form.Control as="select" ref={dropdownRef}>
                            <option value="Food">Food</option>
                            <option value="Shoping">Shoping</option>
                            <option value="Movie">Movie</option>
                            <option value="Buy Grocery">Buy Grocery</option>
                            <option value="Others">Others</option>
                        </Form.Control>
                    </Col>
                    <Col className='col-3'>
                      <Button className=' btn btn-success btn-circle btn-md' type='submit'><i class="fa-solid fa-check" style={{color:'#fcfcfd'}}></i></Button>
                    </Col>
                </Row>
            </Form>
        </Container>
      </Fragment>
    );


}


export default ExpenseForm

import React,{Fragment,useState} from 'react'
import { Button, Dropdown, Form,NavLink,Row,Col,Container} from 'react-bootstrap';
import { editExpenseData } from '../Redux Store/FetchExpenseDataActions';
import { useDispatch } from 'react-redux';
const EditExpense=(props)=>{
 const[amount,setAmount]=useState()
 const[description,setDescription]=useState()
 const[catogory,setCatogory]=useState()
  const dispatch=useDispatch()
  const amountUpdate=(event)=>{
    setAmount(event.target.value)
  }
  const descriptionUpdate=(event)=>{
    setDescription(event.target.value)
  }
  const catogoryUpdate=(event)=>{ 
    setCatogory(event.target.value)
  }
  const editedFormhandler=(event)=>{
    event.preventDefault()
    const editData={
      id:props.data.id,
      type:props.data.type,
      amount:amount,
      description:description,
      catogory:catogory
    }
    dispatch(editExpenseData(editData))
    props.editedData(editData)
  }
    return(
      <Fragment>
        <Container style={{backgroundColor:'#D3ED43',height:'300px'}} className='border border-dark'>
            <Form onSubmit={editedFormhandler}>
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
                    <input type='number'className='m-2'  onChange={amountUpdate} required/>
                    </Col>
                    <Col className='col-4 '>
                        <Form.Control as="select" className='  w-75'onChange={catogoryUpdate} style={{marginLeft:'10px'}} required>
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
                    <Row className='text-center'>
                    <h5 className='m-2'>Description</h5>
                    </Row>
                    <Row >
                    <textarea type='text' className='m-2 ' onChange={descriptionUpdate} style={{backgroundColor:'#D3ED43',height:'138px',border:'none'}}  required/>
                    </Row>
                </Row>
            </Form>
        </Container>
      </Fragment>
    );
}
export default EditExpense
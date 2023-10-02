import React,{Fragment,useState} from 'react'
import { Container,Row,Col,Button } from 'react-bootstrap';
import ExpenseForm from './ExpenseForm';
const ExpensePage=(props)=>{
  const [addPage,setPage]=useState(false)
  const [addExpenseData,setExpenseData]=useState()
    const addExpenseHandler=()=>{
     setPage(true)
    }
    const expenseDataHandler=(item)=>{
     setExpenseData(item)
     setPage(false)
    }
    return(
     <Fragment>
        <Container fluid>
        <Row style={{backgroundColor:'#B0F073'}}>
            <Col className='col-4'><h5>Income</h5></Col>
            <Col className='col-4'></Col>
            <Col className='col-4'><h5>Total Amount Credited</h5></Col>
       </Row>
       <Row>
        <Row>
            <Col className='col-4'>{props.name}</Col>
            <Col className='col-4'>{props.description}</Col>
            <Col className='col-4'>{props.amount}</Col>
        </Row>  
            <Col className='col-4'><h5>Total Income(Credit)</h5></Col>
            <Col className='col-4'></Col>
            <Col className='col-4'><h5>Rs.0/-</h5></Col>
        </Row>
        <Row style={{backgroundColor:'#F0A853'}}>
            <Col className='col-4'><h5>Expense</h5></Col>
            <Col className='col-4'></Col>
            <Col className='col-4'><h5>Total Amount Debited</h5></Col>
        </Row>    
       {addExpenseData && <Row>
            <Col className='col-4'>{addExpenseData.catogory}</Col>
            <Col className='col-4'>{addExpenseData.description}</Col>
            <Col className='col-4'>{addExpenseData.amount}/-</Col>
        </Row>  }
        <Row>  
            <Col className='col-4'><h5>Total Expense(Debit)</h5></Col>
            <Col className='col-4'></Col>
            <Col className='col-4'><h5>Rs.0/-</h5></Col>
        </Row>
       
        <Button className='btn' onClick={addExpenseHandler}>Add Expense</Button>
       {addPage && <ExpenseForm getData={expenseDataHandler}/>}
        </Container>
     </Fragment>
    );
}

export default ExpensePage
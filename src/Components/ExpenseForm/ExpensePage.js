import React,{Fragment,useState,useEffect,useContext} from 'react'
import { Container,Row,Col,Button } from 'react-bootstrap';
import ExpenseForm from './ExpenseForm';
import ExpenseImage from'../../logo/accounting (1).png'
import Context from '../../store/Context';
const ExpensePage=(props)=>{
  const [addPage,setPage]=useState(false)
 const ctx=useContext(Context)
  useEffect(()=>{
   
  },[])
    const addExpenseHandler=()=>{
     setPage(true)
    }
    const expenseDataHandler=(data)=>{
     ctx.setExpense(data)
     setPage(false)
    }
    return(
     <Fragment> 
        <Container fluid>
        <Row>
            <Col className='col-4'>
                <img src={ExpenseImage} className=' w-75  m-5' style={{height:'100%'}}/>
            </Col>
            <Col className='col-7 mt-1 '>
        <Row style={{backgroundColor:'#B0F073'}} className='border-bottom border-dark ' >
            <Col className='col-4 '><h5>Income</h5></Col>
            <Col className='col-4'><h5>Description</h5></Col>
            <Col className='col-4'><h5> Amount Credited</h5></Col>
       </Row>
      
        <Row style={{backgroundColor:'#C8F191'}}>
            <Col className='col-4'>{props.name}</Col>
            <Col className='col-4'>{props.description}</Col>
            <Col className='col-4'>{props.amount}</Col>
        </Row > 
        <Row style={{backgroundColor:'#C8F191'}}className='p-2'> 
            <Col className='col-4'><h5>Total Income(Credit)</h5></Col>
            <Col className='col-4'></Col>
            <Col className='col-4'><h5>Rs.0/-</h5></Col>
        </Row>
       <br/>
        <Row style={{backgroundColor:'#F0A853'}} className='border-bottom border-dark'>
            <Col className='col-4'><h5>Expense</h5></Col>
            <Col className='col-4'><h5>Description</h5></Col>
            <Col className='col-4'><h5> Amount Debited</h5></Col>
        </Row>    
       {ctx.items.map((item)=><li style={{backgroundColor:'#F7B376',listStyle:'none'}} key={item.id}><Row  style={{backgroundColor:'#F7B376'}} >
            <Col className='col-4'><h6>{item.catogory}</h6></Col>
            <Col className='col-4'><h6>{item.description}</h6></Col>
            <Col className='col-4'><h6>Rs.{item.amount}/-</h6></Col>
        </Row> </li>) }
        <Row style={{backgroundColor:'#F7B376'}} className='p-2'>  
            <Col className='col-4'><h5>Total Expense(Debit)</h5></Col>
            <Col className='col-4'></Col>
            <Col className='col-4'><h5>Rs.0/-</h5></Col>
        </Row>
       <Container className='text-center m-2' fluid>
       <Button className='btn ' style={{backgroundColor:'#2F6204'}} onClick={addExpenseHandler}>Add Expense</Button>
       </Container>
       
       {addPage && <ExpenseForm getData={expenseDataHandler}/>}
       </Col>
       </Row>
        </Container>
     </Fragment>
    );
}

export default ExpensePage
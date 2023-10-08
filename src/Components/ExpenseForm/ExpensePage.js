import React,{Fragment,useState,useRef} from 'react'
import { Container,Row,Col,Button,Form } from 'react-bootstrap';
import ExpenseForm from './ExpenseForm';
import ExpenseImage from'../../logo/accounting (1).png'
import EditExpense from './EditExpense';
import { useSelector,useDispatch } from 'react-redux';
import { expensesActions } from '../Redux Store/StoreExpenseSlice';
import { CSVLink } from 'react-csv'

const ExpensePage=(props)=>{
  const [addPage,setPage]=useState(false)
  const csvLink=useRef()
  const [editExpense,setEditExpense]=useState()
  const expenses=useSelector((state)=>state.storeexpense.items)
  const expenseAmount=useSelector((state)=>state.storeexpense.totalAmount)
   
  const dispatch=useDispatch()
 
    const addExpenseHandler=()=>{
     setPage(true)
    }
   
    const expenseEdithandler=(item)=>{
        setPage(true)
     setEditExpense(item)
     
    }
    const editedDataHandler=(item)=>{
        dispatch(expensesActions.editExpense(item))
       setPage(false)
    }
    const expenseDeleteHandler=async (item)=>{
        const response= await fetch(`https://expense-tracker-e1878-default-rtdb.firebaseio.com/${localStorage.getItem('email').split('@')[0]}expenses/${item.id}.json`,{
    method:'DELETE'
   })
       dispatch(expensesActions.removeExpense(item))
    }
   
    const headers=[
        {
            label:'Amount',key:'amount'
        },
        {
            label:'Catogory',key:'catogory'
        },
        {
            label:'Description',key:'description'
        }
    ]
    const csvFileLink={
        filename:'expenses.csv',
        headers:headers,
        data:expenses
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
       {expenses.map((item)=><li style={{backgroundColor:'#F7B376',listStyle:'none'}} key={item.id} className='mb-1 mt-1'><Row  style={{backgroundColor:'#F7B376'}} >
            <Col className='col-2'><h6>{item.catogory}</h6></Col>
            <Col className='col-4'><h6>{item.description}</h6></Col>
            <Col className='col-2'><h6>Rs.{item.amount}/-</h6></Col>
            <Col className='col-2 mt-1'><Button className='btn btn-warning ' style={{height:'30px',width:'30px'}} onClick={expenseEdithandler.bind(null,item)}><i class="fa-solid fa-pen-to-square "></i></Button></Col>
            <Col className='col-2 mt-1 mb-1'><Button className='btn btn-danger'><i class="fa-solid fa-trash" onClick={expenseDeleteHandler.bind(null,item)}></i></Button></Col>
        </Row> </li>) }
        <Row style={{backgroundColor:'#F7B376'}} className='p-2'>  
            <Col className='col-4'><h5>Total Expense(Debit)</h5></Col>
            <Col className='col-4'></Col>
            <Col className='col-4'><h5>Rs.{expenseAmount}/-</h5></Col>
        </Row>
       <Container className='text-center m-2 ' fluid>
       <Button className='btn m-2' style={{backgroundColor:'#2F6204'}} onClick={addExpenseHandler}>Add Expense</Button>
      <Button>
       <CSVLink
       style={{textDecoration:'none',color:'white'}}
       type='button'
         {...csvFileLink}
         filename='transactions.csv'
         className='hidden'
         ref={csvLink}
         target='_blank'
       >
        Download(CSV)
        </CSVLink>
        </Button>
       </Container>
       
       {addPage && !editExpense && <ExpenseForm isConfirm={()=>{setPage(false)}}/>}
       {addPage && editExpense && <EditExpense data={editExpense} editedData={editedDataHandler}/>}
       </Col>
       </Row>
        </Container>
     </Fragment>
    );
}

export default ExpensePage
import React,{Fragment} from 'react'
import { Container,Nav,Navbar } from 'react-bootstrap';
import ExpenseImage from '../../logo/budget.png'
import './Navigation.css'
const Navigation=()=>{
    return(
      <Fragment>
      <Navbar bg="dark" data-bs-theme="dark" className=''>
        <Container >
          <Navbar.Brand href="#home"><img src={ExpenseImage} style={{width:'50px'}} alt=''/>Expense Tracker</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home" className='mx-3'>Home</Nav.Link>
            <Nav.Link href="#features" className='mx-3'>Features</Nav.Link>
            <Nav.Link href="#pricing" className='mx-3'>Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      </Fragment>

    );
}

export default Navigation
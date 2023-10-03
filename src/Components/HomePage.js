import React,{Fragment} from'react'
import PoorImage from '../logo/poor.png'
import { Container } from 'react-bootstrap';
const HomePage=()=>{
    return(
      <Fragment>
        <Container fluid>
        <h1>Welcome To Expense tracker</h1>
        <img src={PoorImage} alt=''/>
        </Container>

      </Fragment>
    );
}

export default HomePage
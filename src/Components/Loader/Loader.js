import React,{Fragment} from 'react'
import ReactDOM from'react-dom'
import { Spinner } from 'react-bootstrap';
import './Loader.css'
const LoaderBackDrop=(props)=>{
    return(
        <div className='backdrop' ></div>
    );
}
const LoaderOverlay=(props)=>{
    return(
        <Fragment>
          <Spinner animation="border" variant="primary" />
        </Fragment>
    );
    
}

const Loader=(props)=>{
    return(
     <Fragment>
       {ReactDOM.createPortal(<LoaderBackDrop onConfirm={props.onConfirm}/>,document.getElementById('backdrop'))}
       {ReactDOM.createPortal(<LoaderOverlay/>,document.getElementById('overlay'))}
     </Fragment>
    );
}

export default Loader
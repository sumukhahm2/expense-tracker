import React,{Fragment,useState} from 'react'
import Context from './Context';
const ContextProvider=(props)=>{

    console.log('context provider')
    const [token,setIdToken]=useState()
    const [userId,setUserId]=useState()
    const tokenHandler=(item)=>{
      setIdToken(item.token)
      setUserId(item.email)
    }
   const loginHandler=()=>{

   }
    const context={
        items:[],
    login:loginHandler,
    setToken:tokenHandler,
    token:token,
    userId:userId
    }
    return(
        <Fragment>
         <Context.Provider value={context}>
            {props.children}
         </Context.Provider>
        </Fragment>

    );
}

export default ContextProvider
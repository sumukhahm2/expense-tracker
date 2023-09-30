import React,{Fragment,useState,useEffect} from 'react'
import Context from './Context';
const ContextProvider=(props)=>{

    console.log('context provider')
    const [token,setIdToken]=useState('')
    const [userId,setUserId]=useState('')
    useEffect(()=>{
        setIdToken(localStorage.getItem('token'))
        setUserId(localStorage.getItem('email'))
    },[])
    const tokenHandler=(item)=>{
      setIdToken(item.token)
      localStorage.setItem('token',item.token)
      const first=item.email.split('@')
      const second=first[1].split('.')
      const email=first[0]+second[0]+second[1];
      setUserId(email)
      localStorage.setItem('email',email)
    }
    const isLogin=!!token
   const logoutHandler=()=>{
    setIdToken('')
    setUserId('')
     localStorage.removeItem('email')
     localStorage.removeItem('token')

   }
    const context={
        items:[],
    login:isLogin,
    setToken:tokenHandler,
    logout:logoutHandler,
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
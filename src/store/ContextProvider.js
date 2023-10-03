import React,{Fragment,useState,useEffect} from 'react'
import Context from './Context';
const ContextProvider=(props)=>{
    const [addExpenseData,setExpenseData]=useState([])
    const [updatedToken,setIdToken]=useState('')
    const [userId,setUserId]=useState('')
    useEffect(()=>{
        setIdToken(localStorage.getItem('token'))
        setUserId(localStorage.getItem('email'))
        async function getExpense(){
            const response=await fetch('https://expense-tracker-e1878-default-rtdb.firebaseio.com/expenses.json',{
                method:'GET'
            })
            
            const data=await response.json()
           let arr=[];
           let i=0
           for(let item in data )
           {
             arr[i]=data[item]
             i++;
           }
           console.log(arr)
           setExpenseData((prev)=>{
                return [...arr,...prev]
            })
        }
        getExpense()
    },[])
    console.log(addExpenseData)
    const tokenHandler=(item)=>{
      setIdToken(item.token)
      localStorage.setItem('token',item.token)
      const first=item.email.split('@')
      const second=first[1].split('.')
      const email=first[0]+second[0]+second[1];
      setUserId(email)
      localStorage.setItem('email',email)
    }
    const addExpenseHandler=(item)=>{
      setExpenseData((prev)=>{
        return [item,...prev]
      })
    }
    const isLogin=!!updatedToken
   const logoutHandler=()=>{
    setIdToken('')
    setUserId('')
     localStorage.removeItem('email')
     localStorage.removeItem('token')

   }
    const context={
        items:addExpenseData,
    login:isLogin,
    setToken:tokenHandler,
    setExpense:addExpenseHandler,
    logout:logoutHandler,
    token:updatedToken,
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
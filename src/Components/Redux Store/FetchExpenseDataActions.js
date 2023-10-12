
import { expensesActions } from "./StoreExpenseSlice"
import { verificationActions } from "./VerificationSlice"


export const fetchDebitExpenseData=()=>{
    return (dispatch)=>{
        async function fetchData(){
            let urlName
            if(localStorage.getItem('email'))
              urlName=localStorage.getItem('email').split('@')[0]+'debitexpense'
            console.log(urlName)
            const response=await fetch(`https://expense-tracker-e1878-default-rtdb.firebaseio.com/${urlName}.json`,{
                method:'GET'
        
            })
            const data=await response.json()
            console.log(data)
            let arr=[]
            let i=0
            for(let key in data)
            {
              arr[i]={...data[key],id:key}
                i++;
            }
            dispatch(expensesActions.setDefaultDebitExpense(arr))
           
           dispatch(expensesActions.setAmount())
         }
         fetchData()
    }
}
 
export const fetchCreditExpenseData=()=>{
  return (dispatch)=>{
      async function fetchData(){
          let urlName
          if(localStorage.getItem('email'))
            urlName=localStorage.getItem('email').split('@')[0]+'creditexpense'
          const response=await fetch(`https://expense-tracker-e1878-default-rtdb.firebaseio.com/${urlName}.json`,{
              method:'GET'
      
          })
          const data=await response.json()
          console.log(data)
          let arr=[]
          let i=0
          for(let key in data)
          {
            arr[i]={...data[key],id:key}
              i++;
          }
          dispatch(expensesActions.setDefaultCreditExpense(arr))
         
         dispatch(expensesActions.setAmount())
       }
       fetchData()
  }
}


export const editExpenseData=(editData)=>{
    return async(dispatch)=>{
      console.log(editData.type)
      let urlName
      if(editData.type==='CREDIT')
        urlName=localStorage.getItem('email').split('@')[0]+'creditexpense'
       else
        urlName=localStorage.getItem('email').split('@')[0]+'debitexpense'
      const response= await fetch(`https://expense-tracker-e1878-default-rtdb.firebaseio.com/${urlName}/${editData.id}.json`,{
        method:'PUT',
        body:JSON.stringify({
          type:editData.type,
            amount:editData.amount,
        description:editData.description,
        catogory:editData.catogory
        })
    })
    const data=await response.json()
    dispatch(expensesActions.editExpense(editData))
    
    }
}


export const sendExpenseData=(inputDatas)=>{
  return async(dispatch)=>{
    let errorMessage='Something went wrong'
    let urlName
    if(inputDatas.type==='CREDIT')
       urlName=localStorage.getItem('email').split('@')[0]+'creditexpense'
     else
     urlName=localStorage.getItem('email').split('@')[0]+'debitexpense'
    const response= await fetch(`https://expense-tracker-e1878-default-rtdb.firebaseio.com/${urlName}.json`,{
     method:'POST',
     body:JSON.stringify({
      type:inputDatas.type,
       amount:inputDatas.amount,
       description:inputDatas.description,
       catogory:inputDatas.catogory
     })
 
    })
    const data=await response.json()
    if(data && data.error && data.error.message)
    {
      errorMessage=data.error.message
      //setError(errorMessage)
    }
    else{
     
      dispatch(expensesActions.addExpense({
        type:inputDatas.type,
       amount:inputDatas.amount,
       description:inputDatas.description,
       catogory:inputDatas.catogory
     }))
     dispatch(expensesActions.setAmount())
     
    }
  }
}


export const deleteExpenseData=(item)=>{
  return async(dispatch)=>{
    let urlName
    if(item.type==='CREDIT')
       urlName=localStorage.getItem('email').split('@')[0]+'creditexpense'
     else
     urlName=localStorage.getItem('email').split('@')[0]+'debitexpense'
    const response= await fetch(`https://expense-tracker-e1878-default-rtdb.firebaseio.com/${urlName}/${item.id}.json`,{
      method:'DELETE'
     })
         dispatch(expensesActions.removeExpense(item))
  }
}


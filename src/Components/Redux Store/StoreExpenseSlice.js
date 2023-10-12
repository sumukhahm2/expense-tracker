import {createSlice} from '@reduxjs/toolkit'
const defaultExpenses={
 items:[],
 credit:[],
 totalAmount:0,
 totalCreditAmount:0,
 isRefresh:false
}
const StoreExpensesSlice=createSlice({
  name:'StoreExpenses',
  initialState:defaultExpenses,
  reducers:{
    setDefaultCreditExpense(state,action){
     state.credit=state.credit.concat(action.payload)
     
    },
    setDefaultDebitExpense(state,action){
    
      state.items=state.items.concat(action.payload)
      console.log(state.items)
     },
    addExpense(state,action){
      console.log(action.payload)
      if(action.payload.type==='CREDIT')
         state.credit=state.credit.concat(action.payload)
       else  
         state.items=state.items.concat(action.payload)
    },
    setAmount(state){
     const debitAmount=state.items.reduce((prev,obj)=>{
      return prev+parseInt(obj.amount)
     },0)
     state.totalAmount=debitAmount
     const creditAmount=state.credit.reduce((prev,obj)=>{
      return prev+parseInt(obj.amount)
     },0)
     state.totalCreditAmount=creditAmount
    },
    removeExpense(state,action){
      if(action.payload.type==='CREDIT')
      {
        const updated=state.credit.filter((obj)=>{
          return obj.id!==action.payload.id 
        })
        state.credit=[...updated]
        state.totalCreditAmount=state.totalCreditAmount-action.payload.amount
      }
      else{
        const updated=state.items.filter((obj)=>{
          return obj.id!==action.payload.id 
        })
        state.items=[...updated]
        state.totalAmount=state.totalAmount-action.payload.amount
      }
        
    },
    editExpense(state,action){
      if(action.payload.type==='CREDIT')
      {
        const updated=state.credit.map((obj)=>{
          return obj.id===action.payload.id?{...obj,...action.payload}:obj
       })
       state.credit=[...updated]
       const amount=state.credit.reduce((prev,obj)=>{
        return prev+parseInt(obj.amount)
       },0)
       state.totalCreditAmount=amount
      }
      else{
        const updated=state.items.map((obj)=>{
          return obj.id===action.payload.id?{...obj,...action.payload}:obj
       })
       state.items=[...updated]
       const amount=state.items.reduce((prev,obj)=>{
        return prev+parseInt(obj.amount)
       },0)
       state.totalAmount=amount
      }
        
    },
    setExpenseRefresh(state){
      state.isRefresh=true
    }
  }

})

export const expensesActions= StoreExpensesSlice.actions
export default StoreExpensesSlice.reducer
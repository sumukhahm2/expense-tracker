import {createSlice} from '@reduxjs/toolkit'
const defaultExpenses={
 items:[],
 totalAmount:0
}
const StoreExpensesSlice=createSlice({
  name:'StoreExpenses',
  initialState:defaultExpenses,
  reducers:{
    addExpense(state,action){
      console.log(action.payload)
     state.items=state.items.concat(action.payload)
    },
    removeExpense(state,action){
        const updated=state.items.filter((obj)=>{
            return obj.id!==action.payload.id
          })
          state.items=[...updated]
    },
    editExpense(state,action){
        const updated=state.items.map((obj)=>{
            return obj.id===action.payload.id?{...obj,...action.payload}:obj
         })
         state.items=[...updated]
    }
  }

})

export const expensesActions= StoreExpensesSlice.actions
export default StoreExpensesSlice.reducer
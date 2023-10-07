import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from '../Redux Store/AuthSlice'
import StoreExpensesReducer from '../Redux Store/StoreExpenseSlice'


const store=configureStore({
    reducer:{auth:AuthReducer,storeexpense:StoreExpensesReducer}
})

export default store

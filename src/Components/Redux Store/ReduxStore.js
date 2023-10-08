import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from '../Redux Store/AuthSlice'
import StoreExpensesReducer from '../Redux Store/StoreExpenseSlice'

import DarkModeReducer from '../Redux Store/DarkModeSlice'
const store=configureStore({
    reducer:{auth:AuthReducer,storeexpense:StoreExpensesReducer,darkmode:DarkModeReducer}
})

export default store

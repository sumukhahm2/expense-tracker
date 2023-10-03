import React from 'react'

const Context=React.createContext({
    items:[],
    login:()=>{},
    setToken:(item)=>{},
    setExpense:(item)=>{},
    editExpense:(item)=>{},
    deleteExpense:(item)=>{},
    logout:()=>{},
    token:'',
    userId:''
})

export default Context
import React from 'react'

const Context=React.createContext({
    items:[],
    login:()=>{},
    setToken:(item)=>{},
    setExpense:(item)=>{},
    logout:()=>{},
    token:'',
    userId:''
})

export default Context
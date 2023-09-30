import React from 'react'

const Context=React.createContext({
    items:[],
    login:()=>{},
    setToken:(item)=>{},
    token:'',
    userId:''
})

export default Context
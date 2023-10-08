import React,{Fragment,useEffect} from 'react'
import './App.css';
import AuthForm from './Components/AuthForm';
import Navigation from './Components/Navigation/Navigation';
import HomePage from './Components/HomePage';
import { useSelector,useDispatch } from 'react-redux';
import ExpensePage from './Components/ExpenseForm/ExpensePage';
import { authActions } from './Components/Redux Store/AuthSlice';
import { expensesActions } from './Components/Redux Store/StoreExpenseSlice';
import { Routes,Route,Navigate } from 'react-router-dom';
function App() {
 const auth=useSelector((state)=>state.auth.isAuthenticated)
 const isdarkMode=useSelector((state)=>state.darkmode.inDarkMode)
 const dispatch=useDispatch()
 useEffect(()=>{
   dispatch(authActions.setToken({token:localStorage.getItem('token'),email:localStorage.getItem('email')}))
   dispatch(authActions.login())
   
   async function fetchData(){
    let email=''
    console.log(localStorage.getItem('email'))
    if(localStorage.getItem('email'))
      email=localStorage.getItem('email').split('@')
    const response=await fetch(`https://expense-tracker-e1878-default-rtdb.firebaseio.com/${email[0]}.json`,{
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
    dispatch(expensesActions.addExpense(arr))
   
   dispatch(expensesActions.setAmount())
 }
 fetchData()
 },[localStorage.getItem('email')])
useEffect(()=>{
  document.body.style.backgroundColor = isdarkMode ? "#292c35" : "#fff";
  document.body.style.color = isdarkMode ? "#fff" : "#292c35";
},[isdarkMode])
  console.log(auth)
  return (
    <Fragment>
    <header>
    <Navigation />
    </header>
    <main>
      <Routes>
      {auth && <Route path='/home' element={<HomePage/>} exact></Route>}
      {auth && <Route path='/expenselist' element={<ExpensePage/>} exact></Route>}
      {!auth && <Route path='/login' element={<AuthForm/>}></Route>}
      {auth && <Route path='/login' element={<Navigate to='/home'/>}/>}
      {!auth && <Route path='/home' element={<Navigate to='/login'/>}/>}
      <Route path='*' element={<Navigate to='/login'/>}/>
      </Routes>
      
    </main>
    </Fragment>
  );
}

export default App;

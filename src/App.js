import React,{Fragment,useEffect,useState} from 'react'
import './App.css';
import AuthForm from './Components/AuthForm';
import Navigation from './Components/Navigation/Navigation';
import HomePage from './Components/HomePage';
import { useSelector,useDispatch } from 'react-redux';
import ExpensePage from './Components/ExpenseForm/ExpensePage';
import { authActions } from './Components/Redux Store/AuthSlice';
import { fetchCreditExpenseData } from './Components/Redux Store/FetchExpenseDataActions';
import { fetchDebitExpenseData } from './Components/Redux Store/FetchExpenseDataActions';
import { fetchProfileData } from './Components/Redux Store/FetchProfileData';
import { Routes,Route,Navigate } from 'react-router-dom';

function App() {
 const auth=useSelector((state)=>state.auth.isAuthenticated)
 const isdarkMode=useSelector((state)=>state.darkmode.inDarkMode)
 const dispatch=useDispatch()
 
 useEffect(()=>{
  console.log(localStorage.getItem('email'))
   dispatch(authActions.setToken({token:localStorage.getItem('token'),email:localStorage.getItem('email')}))
   dispatch(authActions.login())
   },[dispatch])
useEffect(()=>{
  document.body.style.backgroundColor = isdarkMode ? "#292c35" : "#fff";
  document.body.style.color = isdarkMode ? "#fff" : "#292c35";
},[isdarkMode])
useEffect(()=>{
  console.log('useeffect')
  dispatch(fetchDebitExpenseData())
  dispatch(fetchCreditExpenseData())
  
  dispatch(fetchProfileData())
 },[dispatch])
 
  return (
    <Fragment>
    <header>
    <Navigation />
    </header>
    <main>
      <Routes>
      {auth && <Route path='/home' element={<HomePage/>} exact></Route>}
      {auth && <Route path='/expenselist' element={<ExpensePage/>} exact></Route>}
      {!auth && <Route path='/login' element={<AuthForm />}></Route>}
      
      {!auth && <Route path='/home' element={<Navigate to='/login'/>}/>}
      <Route path='*' element={<Navigate to='/login'/>}/>
      </Routes>
      
    </main>
    </Fragment>
  );
}

export default App;

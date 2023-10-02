import React,{Fragment,useContext,useState} from 'react'
import './App.css';
import AuthForm from './Components/AuthForm';
import Navigation from './Components/Navigation/Navigation';
import HomePage from './Components/HomePage';
import Context from './store/Context';
import ExpensePage from './Components/ExpenseForm/ExpensePage';
import { Routes,Route,Navigate } from 'react-router-dom';
function App() {
  const ctx=useContext(Context)
  
 console.log(ctx.login)
  return (
    <Fragment>
    <header>
    <Navigation />
    </header>
    <main>
      <Routes>
      {ctx.login && <Route path='/home' element={<HomePage/>} exact></Route>}
      {ctx.login && <Route path='/expenselist' element={<ExpensePage/>} exact></Route>}
      {!ctx.login && <Route path='/login' element={<AuthForm/>}></Route>}
      <Route path='*' element={<Navigate to='/login'/>}/>
      </Routes>
      
    </main>
    </Fragment>
  );
}

export default App;

import React,{Fragment,useContext,useState} from 'react'
import './App.css';
import AuthForm from './Components/AuthForm';
import Navigation from './Components/Navigation/Navigation';
import HomePage from './Components/HomePage';
import Context from './store/Context';

function App() {
  const ctx=useContext(Context)
  
 
  return (
    <Fragment>
    <header>
    <Navigation />
    </header>
    <main>
      {!ctx.login && <AuthForm/>}
      {ctx.login && <HomePage/>}
      
    </main>
    </Fragment>
  );
}

export default App;

import React,{Fragment} from 'react'
import './App.css';
import AuthForm from './Components/AuthForm';
import Navigation from './Components/Navigation/Navigation';
function App() {
  return (
    <Fragment>
    <header>
    <Navigation/>
    </header>
    <main>
      <AuthForm/>
    </main>
    </Fragment>
  );
}

export default App;

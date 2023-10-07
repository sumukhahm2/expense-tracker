import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import '../node_modules/react-bootstrap/dist/react-bootstrap'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import store from './Components/Redux Store/ReduxStore';
const firebaseConfig = {
    apiKey: "AIzaSyAu2UHhhGAzmHYd7ZeIIIT_QFH-qiJ9xog",
    authDomain: "expense-tracker-e1878.firebaseapp.com",
    projectId: "expense-tracker-e1878",
    storageBucket: "expense-tracker-e1878.appspot.com",
    messagingSenderId: "582615243157",
    appId: "1:582615243157:web:ee96420655f00874e33e9c"
  };
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<Provider store={store}>
  <BrowserRouter>
    <App />
    </BrowserRouter>
    </Provider>
   
  
);


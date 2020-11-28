import React from 'react';
import {Route,BrowserRouter} from 'react-router-dom';
import Join from './components/JoinComponent';
import Chat from './components/ChatComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App=()=>{
    return(
      <BrowserRouter>
      <Route path="/" exact component={Join}></Route>
      <Route path="/chat" component={Chat}></Route>
      </BrowserRouter>
    )
}

export default App;

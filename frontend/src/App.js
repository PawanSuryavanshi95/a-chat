import React from 'react';
import {Route,BrowserRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/Home';
import Chat from './components/Chat';

const App=()=>{
    return(
      <BrowserRouter>
      <Route path="/" exact component={Home}></Route>
      <Route path="/chat" component={Chat}></Route>
      </BrowserRouter>
    )
}

export default App;

import React from 'react';
import {Route,BrowserRouter} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Home from './screens/Home';
import Main from './screens/Main';

const App=()=>{
    return(
      <BrowserRouter>
      <Route path="/" exact component={Home}></Route>
      <Route path="/chat" component={Main}></Route>
      </BrowserRouter>
    )
}

export default App;

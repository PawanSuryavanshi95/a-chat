import React from 'react';
import {Route,BrowserRouter} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Home from './screens/Home';
import Main from './screens/Main';
import OneToOne from './screens/OneToOne';
import OneToMany from './screens/OneToMany';
import ChatRoom from './screens/ChatRoom';

const App=()=>{
    return(
      <BrowserRouter>
      <Route path="/" exact component={Home}></Route>
      <Route exact path="/chat" component={Main}></Route>
      <Route exact path="/chat/1to1/" component={OneToOne}></Route>
      <Route exact path="/chat/grp/" component={OneToMany}></Route>
      <Route exact path="/chat/:type/room" component={ChatRoom}></Route>
      </BrowserRouter>
    )
}

export default App;

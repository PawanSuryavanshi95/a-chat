import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import queryString from 'query-string';
import {Link} from 'react-router-dom';

class Main extends Component{

    constructor(props){
        super(props);
        this.state ={
            bool:true,
        };
        toast.configure();
    }

    render(){
        const {handle} = queryString.parse(this.props.history.location.search);
        return(
            <div className="wrapper">
                <div className="main-chat">
                <h1 className="heading">A-Chat</h1>
                <div className="main-content">
                <p className="title-container__subtitle text-center">Welcome {handle}, Please respect others while chatting.</p>
                <div className="center row">
                <button class="button button--mimas"><span><Link to={"/chat/1to1?handle="+handle}>One to One</Link></span></button>
                <button class="button button--mimas"><span><Link to={"/chat/grp?handle="+handle}>Group Chat</Link></span></button>
                </div>
                </div>  
                </div>
            </div>
        )
    }
}

export default Main;
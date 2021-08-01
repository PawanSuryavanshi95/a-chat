import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Input, Button, Form } from 'reactstrap';
import {Link} from 'react-router-dom';
import queryString from 'query-string';

import ChatRoom from './ChatRoom';

class OneToOne extends Component{

    constructor(props){
        super(props);
        this.state = {
            desc:'',
            chat:false,
        }
        toast.configure();
    }

    render(){
        const {handle} = queryString.parse(this.props.history.location.search);
        return(
            <div className="wrapper">
            <div className="main-chat">
            <h1 className="heading">One to One Chat</h1>
            <div className="tab">
            <div>
                <div class="form-group purple-border">
                <label for="exampleFormControlTextarea4">Your Interests</label>
                <textarea class="form-control" id="exampleFormControlTextarea4" rows="3" 
                    value={this.state.desc}
                    onChange={(e)=>{this.setState({desc:e.target.value})}}></textarea>
                </div>
                <div className="center"><button class="button button--telesto"><Link to={"/chat/1to1/room?id=&handle="+handle}><span>Connect</span></Link></button></div>
            </div>
            </div>
            </div>
            </div>
        )
    }
}

export default OneToOne;
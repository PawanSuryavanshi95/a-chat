import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import queryString from 'query-string';

import Rooms from '../components/Rooms';

class OneToMany extends Component{

    constructor(props){
        super(props);
        this.state = {
            chat:false,
            room:'',
        }
        toast.configure();
        this.room = '';
    }

    render(){
        const {handle} = queryString.parse(this.props.history.location.search);
        return(
            <div className="wrapper">
            <div className="main-chat">
                <h1 className="heading">Group Chat</h1>
                
            <div className="tab">
            <Rooms join={(room) => { this.setState({chat:true}); this.room=room }} handle={handle} />
            </div>
            </div>
            </div>
        )
    }
}

export default OneToMany;
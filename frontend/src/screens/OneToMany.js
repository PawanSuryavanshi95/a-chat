import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ChatRoom from '../components/ChatRoom';
import Rooms from '../components/Rooms';

class OneToMany extends Component{

    constructor(props){
        super(props);
        this.state = {
            chat:false,
            room:'',
        }
        toast.configure();
    }

    render(){
        return(
            <div className="tab">
            {this.state.chat? <ChatRoom handle={this.props.handle} room={this.state.room} type="1tomany" />:
                <Rooms join={(room) => this.setState({room:room, chat:true})} />
            }
            </div>
        )
    }
}

export default OneToMany;
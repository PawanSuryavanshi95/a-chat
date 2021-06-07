import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Input, Button, Form } from 'reactstrap';

import ChatRoom from '../components/ChatRoom';

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
        return(
            <div className="tab">
            {this.state.chat? <ChatRoom handle={this.props.handle} room="" type="1to1" />:
                <Form>
                <Input 
                    type="text"
                    placeholder="Your Interests"
                    value={this.state.desc}
                    onChange={(e)=>{this.setState({desc:e.target.value})}}
                    />
                <Button color="primary" onClick={(e)=>{e.preventDefault(); this.setState({chat:true}); }}>Connect</Button>
                </Form>
            }
            </div>
        )
    }
}

export default OneToOne;
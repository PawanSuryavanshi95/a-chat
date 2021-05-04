import React, { Component } from 'react';
import {Button,Form,Input} from 'reactstrap';

class InputBar extends Component{

    constructor(props){
        super(props);
        this.state = { message:"" };
    }

    submithandler = (e)=>{
        e.preventDefault();
        this.setState({message:""});
        this.props.sendMessage(this.state.message);
    }

    render(){
        return(
            <Form onSubmit={(e)=>{this.submithandler(e)}}>
                <div className="container">
                    <div className="row">
                        <Input className="col-10"
                        type="text"
                        placeholder="Type in message.."
                        value={this.state.message}
                        onChange={(e)=>{this.setState({message:e.target.value})}}
                        />
                        <Button className="col-1"variant="primary" onClick={(e)=>{this.submithandler(e)}}>Send</Button>
                </div>
                </div>
            </Form>
        )
    }
}

export default InputBar;
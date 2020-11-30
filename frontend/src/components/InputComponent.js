import React, { Component } from 'react';
import {Button,Form,Input} from 'reactstrap';

class InputBar extends Component{

    constructor(props){
        super(props);
        this.state = { message:"" };
    }

    render(){
        return(
            <Form>
                <div className="container">
                    <div className="row">
                        <Input className="col-10"
                        type="text"
                        placeholder="Type in message.."
                        onChange={(e)=>{this.setState({message:e.target.value}); console.log("A")}}/>
                        <Button className="col-1"variant="primary" onClick={(e)=>this.props.sendMessage(this.state.message)}>Send</Button>
                </div>
                </div>
            </Form>
        )
    }
}

export default InputBar;
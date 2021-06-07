import React, { Component } from 'react';
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';

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
            <div className="input">
                <form onSubmit={(e)=>{this.submithandler(e)}}>
                    <InputGroup>
                        <Input 
                            type="text"
                            placeholder="Type in message.."
                            value={this.state.message}
                            onChange={(e)=>{this.setState({message:e.target.value})}}
                            />
                        <InputGroupAddon addonType="append">
                            <Button color="primary" onClick={(e)=>{this.submithandler(e)}}>Send</Button>
                        </InputGroupAddon>
                    </InputGroup>
                </form>
            </div>
        )
    }
}

export default InputBar;
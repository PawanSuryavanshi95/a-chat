import React from 'react';
import {Button,Form,Input} from 'reactstrap';
const InputComp=({sendMessage})=>{
    var message="";
    return(
        <Form>
            <div className="container">
                <div className="row">
                    <Input className="col-10"
                    type="text"
                    placeholder="Type in message.."
                    value={message}
                    onChange={(e)=>{message=e.target.value}}
                    onKeyPress={(e)=>(e.key==='Enter'?sendMessage(message) : null)}/>
                    <Button className="col-1"variant="primary" onClick={(e)=>sendMessage(e)}>Send</Button>
            </div>
            </div>
        </Form>
    )
}

export default InputComp;
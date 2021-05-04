import React from 'react';
import {Button} from 'reactstrap';
const InfoBar=({room})=>{
    return(
    <div className="container join-container-chat">
        <div className="row">
            <p >{room}</p>
            <a className="col-1 offset-1"href="/">
                <Button className="exit" >Leave</Button>
            </a>
        </div>
            
    </div>)
}

export default InfoBar;
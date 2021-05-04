import React from 'react';
import {Button} from 'reactstrap';
const InfoBar=({handle})=>{
    return(
    <div className="container join-container-chat">
        <div className="row">
            <p >{handle}</p>
            <a href="/">
                <Button color="danger" light className="exit" >Leave</Button>
            </a>
        </div>
    </div>
    )
}

export default InfoBar;
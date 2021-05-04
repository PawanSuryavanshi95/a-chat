import React from 'react';
import { Spinner } from 'reactstrap';

const Waiting=()=>{
    return(
        <div className="waiting" >
            <p>Sit tight while I connect you to a user :)</p>
            <Spinner color="primary" style={{ width: '5vw', height: '5vw' }} />
        </div>
    )
    
}

export default Waiting;
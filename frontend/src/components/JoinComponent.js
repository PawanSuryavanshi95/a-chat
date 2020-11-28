import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';
const Join = () =>{
    const [name,setName]=useState('');
    const [room,setRoom]=useState('abc');

    return(
        <div className="wrapper">
            <div className="main">
                <div className="container-fluid">
                    <h1 className="title-container__title text-center ">A-Chat</h1>
                    <p className="title-container__subtitle text-center">Chat with Users anonymously.</p>
                    <div className=" join-container d-flex flex-column align-items-center">
                        <p>Enter Your Nickname! </p>
                        <input className="nickname" placeholder="Name" type="text" onChange={(e)=>setName(e.target.value)}/>
                        <Link to={`/chat?name=${name}&room=${room}`}>
                            <Button type="submit" className="match">Find my Match!</Button>
                        </Link>
                    </div>
                    
                </div>
            </div>
        </div>
        
    
    )
} 

export default Join;
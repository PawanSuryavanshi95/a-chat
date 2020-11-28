import React from 'react';
import ReactEmoji from 'react-emoji'

const Message=({message:{user,text},name})=>{
    let sentbycurruser=false;

    if(user===name.trim().toLowerCase()){
        sentbycurruser=true;
    }
    return(
        sentbycurruser
        ?<div className="container">
            <p>{name.trim().toLowerCase()}</p>
            <p>{ReactEmoji.emojify(text)}</p>
        </div>
        :<div>
            <p>{ReactEmoji.emojify(text)}</p>
            <p>{user}</p>
        </div>
    )
    
}

export default Message;
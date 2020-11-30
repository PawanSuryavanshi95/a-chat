import React from 'react';
import ReactEmoji from 'react-emoji'

const Message=({message:{user,text},handle})=>{
    
    return(
        <div>
            <p>{user}</p>
            <p>{ReactEmoji.emojify(text)}</p>
        </div>
    )
    
}

export default Message;
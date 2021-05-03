import React from 'react';
import ReactEmoji from 'react-emoji'

const Message=({message:{user,text,self},handle})=>{
    var align = self===true?'right':'left';
    return(
        <div>
            {self===true?null:<p>{user}</p>}
            <p style={{textAlign: align}}>{ReactEmoji.emojify(text)}</p>
        </div>
    )
    
}

export default Message;
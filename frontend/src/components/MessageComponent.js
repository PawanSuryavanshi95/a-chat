import React from 'react';
import ReactEmoji from 'react-emoji'

const Message=({message:{user,text,self},sent,read})=>{
    var align = self===true?'right':'left';
    return(
        <div>
            {self===true?null:<p>{user}</p>}
            <p style={{textAlign: align}}>{ReactEmoji.emojify(text + (self?sent?' (sent)':' (unsent)':'') +  (self?read?' (read)':' (unread)':''))}</p>
        </div>
    )
    
}

export default Message;
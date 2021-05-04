import React from 'react';

const Message=({message:{user,text,self},sent,read,bool})=>{
    return(
        <div>
            {self?null: bool? null :<div className="message-badge">{user.slice(0,1)}</div>}
            <div className={`message-text${self?' user-msg':''}`}>
            {(text + (self?sent?' (sent)':' (unsent)':'') +  (self?read?' (read)':' (unread)':''))}
            </div>
        </div>
    )
}

export default Message;
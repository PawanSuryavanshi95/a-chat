import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './MessageComponent'
const Messages=({messageslist,name})=>{
    return(
        <ScrollToBottom>
            {messageslist.map((message,i)=><div key={i}><Message message={message} name={name}></Message></div>)}
        </ScrollToBottom>
    )
}

export default Messages;
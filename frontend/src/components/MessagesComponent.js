import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './MessageComponent'
const Messages=({messageslist,handle})=>{
    var i=1;
    console.log(messageslist)
    return(
        <ScrollToBottom>
            {messageslist.map((message)=><div key={i++}><Message message={message} handle={handle}></Message></div>)}
        </ScrollToBottom>
    )
}

export default Messages;
import React, { Component } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './MessageComponent';

class Messages extends Component{
    
    constructor(props){
        super(props);

        this.state = {
            len:0,
            len2:0,
        }
    }

    componentDidMount(){

        this.props.socket.on('SENT_RECIEPT', ({msgID})=>{
            this.setState({len2:msgID});
        });
        
        this.props.socket.on('READ_RECIEPT',({len})=>{
            this.setState({len:len});
        });

            

        window.addEventListener("focus", this.onFocus)
    }
    
    componentWillUnmount() {
        window.removeEventListener("focus", this.onFocus)
    }
    
    onFocus = () => {
        this.props.socket.emit('READ',{len:this.props.messageslist.length});
    }

    render(){
        var i=1,j=1;
        console.log(this.props.messageslist);
        var {messageslist} = this.props;
        return(
            <ScrollToBottom>
                {messageslist.map((message)=><div key={i++}><Message message={message} sent={message.self && j<=this.state.len2} read={i<=this.state.len}></Message></div>)}
            </ScrollToBottom>
        )
    }
}

export default Messages;
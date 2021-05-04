import React, { Component } from 'react';
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
        var {messageslist} = this.props;
        var i=1, j=1, prev='';
        console.log(this.props.messageslist);

        return(
            <div className="message-grp">
                {messageslist.map((message)=>{
                    var bool = prev===message.user;
                    prev = message.user;
                    return (
                        <div key={i++}><Message message={message} sent={message.self && j<=this.state.len2} read={i<=this.state.len} bool={bool}></Message></div>
                    )
                })}
            </div>
        )
    }
}

export default Messages;
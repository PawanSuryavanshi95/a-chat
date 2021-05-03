import React, { Component } from 'react';
import socketio from 'socket.io-client';
import queryString from 'query-string';
import InfoBar from './InfoBar';
import InputComp from './InputComponent';
import Messages from './MessagesComponent';

class Chat extends Component{

    constructor(props){
        super(props);
        this.state ={
            ENDPOINT:"localhost:5000",
            messages:[],
            joined:false,
            connected:false,
            curTime:0,
        };
        this.socket=null;
        const {handle}=queryString.parse(this.props.history.location.search);
        this.info = { handle};
    }

    componentDidMount(){
        const {handle}=this.info;
        this.socket = socketio.connect(this.state.ENDPOINT);
        this.socket.on("hello",()=>{
            console.log("server said hello")
        })

        if(this.state.joined===false){
            this.socket.emit("JOIN", {handle});
            this.setState({joined:true});
        }
        
        setInterval(() => {
            this.socket.emit('CREATE_ROOM',{});
            if(this.state.connected===false){
                this.setState({
                    curTime : new Date().toLocaleString()
                    })
            }
            
        }, 5000);

        this.socket.on('CREATE_ROOM_RESPONSE', (data)=>{
            if(data.success===true){
                this.setState({connected:true});
            }
        });
        
        this.socket.on('ROOM_EMPTY', ()=>{
            const newMessages = [];
            this.setState({
                messages: newMessages,
                connected:false,
            });
        });

        this.socket.on('RECIEVE', (message)=>{
            const newMessages = [...this.state.messages];
            newMessages.push(message);
            this.setState({
                messages: newMessages,
            });
        });
    }

    sendMessage = (text) => {
        const {handle} = this.info;
        const newMessages = [...this.state.messages];
        newMessages.push({'user':handle, text, self:true});
        this.setState({
            messages: newMessages,
        });
        this.socket.emit("SEND",{text,handle});
    }

    render(){
        const {handle,room} = queryString.parse(this.props.history.location.search);
        console.log(this.state);
        return(
            <div className="wrapper">
                <div className="main-chat">
                <InfoBar room={room}></InfoBar>
                {this.state.connected===true?
                    <div>
                    <Messages messageslist={this.state.messages} handle={handle}></Messages>
                    <InputComp sendMessage={this.sendMessage}/>
                    </div> : <div>Waiting for Other users</div>}
                </div>
            </div>    
        )
    }
}

export default Chat;
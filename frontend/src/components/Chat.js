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
        };
        this.socket=null;
        const {handle,room}=queryString.parse(this.props.history.location.search);
        this.info = { handle, room };
    }

    componentDidMount(){
        const {handle,room}=this.info;
        this.socket = socketio.connect(this.state.ENDPOINT);
        this.socket.on("hello",()=>{
            console.log("server said hello")
        })
        this.socket.emit("JOIN", {handle,room});
        this.socket.on('RECIEVE', (message)=>{
            const newMessages = [...this.state.messages];
            newMessages.push(message);
            this.setState({
                messages: newMessages,
            });
        })
    }

    sendMessage = (text) => {
        const {handle,room} = this.info;
        this.socket.emit("SEND",{text,handle,room});
    }

    render(){
        const {handle,room} = queryString.parse(this.props.history.location.search);
        return(
            <div className="wrapper">
                <div className="main-chat">
                <InfoBar room={room}></InfoBar>
                <Messages messageslist={this.state.messages} handle={handle}></Messages>
                <InputComp sendMessage={this.sendMessage}/>
                </div>
            </div>    
        )
    }
}

export default Chat;
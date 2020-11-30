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
        this.socket=socketio.connect(this.state.ENDPOINT);
    }

    componentDidMount(){
        const {handle,room}=queryString.parse(this.props.history.location.search);
        
        this.socket.on("hello",()=>{
            console.log("server said hello")
        })
        this.socket.emit("JOIN", {handle,room});
    }

    sendMessage = (data) => {
        this.socket.emit("SEND_MESSAGE",data);
    }

    render(){
        const {handle,room} = queryString.parse(this.props.history.location.search);
        return(
            <div className="wrapper">
                <div className="main-chat">
                <InfoBar room={room}></InfoBar>
                <Messages messageslist={this.state.messages} name={handle}></Messages>
                <InputComp sendMessage={this.sendMessage}/>
                </div>
            </div>    
        )
    }
}

export default Chat;
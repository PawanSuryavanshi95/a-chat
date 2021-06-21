import React, { Component } from 'react';
import socketio from 'socket.io-client';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import InputComp from './InputComponent';
import Messages from './MessagesComponent';
import Waiting from './Waiting';

class ChatRoom extends Component{

    constructor(props){
        super(props);
        this.state ={
            ENDPOINT:"https://a-chat--server.herokuapp.com/",
            messages:[],
            joined:false,
            connected:false,
            curTime:0,
        };
        this.socket=null;
        this.sentMSG = 0;
        toast.configure();
    }

    componentDidMount(){
        const {handle,room,type} = this.props;

        this.socket = socketio.connect(this.state.ENDPOINT,{
            withCredentials: false,
            extraHeaders: {
                "my-custom-header": "abcd"
            }
        });
        this.socket.on("hello",()=>{
            console.log("server said hello");
        })

        if(this.state.joined===false){
            this.socket.emit("JOIN", {handle, type});
            this.setState({joined:true});
            this.socket.emit("CONNECT_ROOM",{room, type});
        }
        if(type==='1to1'){
            if(this.state.connected===false){
                this.socket.on('CONNECTED', (data)=>{
                    if(data.success===true){
                        this.setState({connected:true});
                    }
                    else{
                        setInterval(() => {
                            if(this.state.connected===false){
                                console.log('A');
                                this.socket.emit('CONNECT_ROOM',{room,type});
                                this.setState({
                                    curTime : new Date().toLocaleString()
                                    })
                            }
                            
                        }, 5000);
                    }
                });
            }
        }

        this.socket.on('ROOM_EMPTY', (log)=>{
            toast('User left :(');
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
        this.sentMSG++;
        const {handle} = this.props;
        const newMessages = [...this.state.messages];
        newMessages.push({'user':handle, text, self:true});
        this.setState({
            messages: newMessages,
        });
        this.socket.emit("SEND",{text,handle, msgID:this.sentMSG});
    }

    render(){
        return (
            this.state.connected ?
            
            <div className="chat-room">
                <Messages messageslist={this.state.messages} socket={this.socket} ></Messages>
                <InputComp sendMessage={this.sendMessage}/>
            </div> 
            
            :
            
            <div className="chat-room">
                <Waiting />
            </div>
        )
    }
}

export default ChatRoom;
import React, { Component } from 'react';
import socketio from 'socket.io-client';
import queryString from 'query-string';
import InfoBar from './InfoBar';
import InputComp from './InputComponent';
import Messages from './MessagesComponent';
import Waiting from './Waiting';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Chat extends Component{

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
        const {handle}=queryString.parse(this.props.history.location.search);
        this.info = { handle};
        this.sentMSG = 0;
        toast.configure();
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
        
        
        if(this.state.connected===false){
            this.socket.on('CREATE_ROOM_RESPONSE', (data)=>{
                if(data.success===true){
                    this.setState({connected:true});
                }
                else{
                    setInterval(() => {
                        if(this.state.connected===false){
                            console.log('A');
                            this.socket.emit('CREATE_ROOM',{});
                            this.setState({
                                curTime : new Date().toLocaleString()
                                })
                        }
                        
                    }, 5000);
                }
            });
    
        }
        
        this.socket.on('ROOM_EMPTY', ()=>{
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
        const {handle} = this.info;
        const newMessages = [...this.state.messages];
        newMessages.push({'user':handle, text, self:true});
        this.setState({
            messages: newMessages,
        });
        this.socket.emit("SEND",{text,handle, msgID:this.sentMSG});
    }

    render(){
        const {room} = queryString.parse(this.props.history.location.search);
        console.log(this.state);
        return(
            <div className="wrapper">
                <div className="main-chat">
                
                <InfoBar room={room}></InfoBar>
                {this.state.connected===true?
                    <div className="messages-container">
                    <Messages messageslist={this.state.messages} socket={this.socket} ></Messages>
                    <InputComp sendMessage={this.sendMessage}/>
                    </div> : <Waiting />}
                    
                </div>
            </div>    
        )
    }
}

export default Chat;
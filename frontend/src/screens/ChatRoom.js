import React, { Component } from 'react';
import socketio from 'socket.io-client';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Button} from 'reactstrap';
import queryString from 'query-string';
import { Redirect } from "react-router-dom";

import InputComp from '../components/InputComponent';
import Messages from '../components/MessagesComponent';
import Waiting from '../components/Waiting';

class ChatRoom extends Component{

    constructor(props){
        super(props);
        this.state ={
            ENDPOINT:"https://a-chat--server.herokuapp.com/",
            messages:[],
            joined:false,
            connected:false,
            redirect:false,
        };
        this.socket=null;
        this.sentMSG = 0;
        this.users = 0;
        toast.configure();
    }

    componentDidMount(){
        const {handle,id} = queryString.parse(this.props.history.location.search);
        const room = id;
        const type=this.props.match.params.type;
        console.log(handle,room);

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
        
        if(this.state.connected===false){
            this.socket.on('CONNECTED', (data)=>{
                if(data.success===true){
                    this.setState({connected:true});
                    if(data.users<=1){
                        toast(`Empty Room :(`);
                    }
                    console.log('connected')
                }
                else{
                    if(type==='1to1'){
                        setInterval(() => {
                            if(this.state.connected===false){
                                console.log('A');
                                this.socket.emit('CONNECT_ROOM',{room,type});
                                this.setState({
                                    curTime : new Date().toLocaleString()
                                    })
                            }
                            
                        }, 10000);
                    }
                }
            });
        }

        this.socket.on('USER_LEFT', (user)=>{
            toast(`${user} left `);
            this.users = this.users - 1;
            if(type==='1to1'){
                this.setState({connected:false, messages:[]});
            }
        });

        this.socket.on('USER_JOINED', (user)=>{
            toast(`${user} joined `);
            this.users = this.users + 1;
            if(type==='1to1'){
                this.setState({connected:true});
            }
        });

        this.socket.on('RECIEVE', (message)=>{
            const newMessages = [...this.state.messages];
            console.log(message)
            newMessages.push(message);
            this.setState({
                messages: newMessages,
            });
        });
    }
    
    sendMessage = (text) => {
        this.sentMSG++;
        const {handle} = queryString.parse(this.props.history.location.search);
        const newMessages = [...this.state.messages];
        newMessages.push({'user':handle, text, self:true});
        this.setState({
            messages: newMessages,
        });
        this.socket.emit("SEND",{text,handle, msgID:this.sentMSG});
    }

    leaveHandler = () => {
        this.socket.emit("LEFT");
        this.setState({connected:false, messages:[]});
        this.users = 0;
        this.setState({redirect:true});
    }

    render(){
        const {handle} = queryString.parse(this.props.history.location.search);
        return (
            this.state.redirect ?
            <Redirect to={"/chat?handle="+handle} />
                :
            <div className="wrapper">
            <div className="main-chat">
            {this.state.connected ?
            
            <div className="chat-room">
                <div className="row container chat-head">
                    <div className="center row">
                    <div>a</div>
                    <Button color="danger" light className="exit" onClick={this.leaveHandler}>Leave</Button>
                    {/*<button class="button button--rhea" onClick={this.leaveHandler}><span>Exit</span></button>*/}
                    </div>
                </div>
                <Messages messageslist={this.state.messages} socket={this.socket} ></Messages>
                <InputComp sendMessage={this.sendMessage}/>
            </div> 
            
            :
            
            <div className="chat-room">
                <Waiting />
            </div>}
        </div>
        </div>   
        )
    }
}

export default ChatRoom;
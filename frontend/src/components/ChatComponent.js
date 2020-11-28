import React, { useEffect ,useState} from 'react';
import io from'socket.io-client';
import queryString from 'query-string';
import InfoBar from './InfoBar';
import InputComp from './InputComponent';
import Messages from './MessagesComponent';
let socket;
const Chat = ({location}) =>{
    const [name,setName]=useState('');
    const [room,setRoom]=useState('abc');
    const[message,setMessage]=useState([]);
    const[messageslist,setMessageslist]=useState([]);
    const ENDPOINT='localhost:5000'

    useEffect(()=>{
        const {name,room}=queryString.parse(location.search);
        
        socket=io(ENDPOINT);
        setName(name);
        setRoom(room);
        console.log(socket)
        socket.emit('join',{name:name,room:room},()=>{

        });
        return()=>{
            socket.emit('disconnect');
            socket.off();
        }
        
    },[ENDPOINT,location.search])

    useEffect(()=>{
        socket.on('message',(message)=>{
            setMessageslist([...messageslist,message])
        },[messageslist]);
    
    })
    const sendMessage=(e)=>{
        e.preventDefault()
        console.log("hi")
        
        if (message){
            socket.emit('sendMessage',message,()=>{
                setMessage("")
            })
        }
        setMessage("")
        
    }
    return(
        <div className="wrapper">
            <div className="main-chat">
            <InfoBar room={room}></InfoBar>
            <Messages messageslist={messageslist}></Messages>
            <InputComp message={message} setMessage={setMessage} sendMessage={sendMessage}/>
            </div>
            
        </div>
        
    )
} 

export default Chat;
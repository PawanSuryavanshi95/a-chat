import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import {Link} from 'react-router-dom';

class Rooms extends Component {

    constructor(props){
        super(props);
        this.state = {
            rooms:[],
            name:'',
        }
        this.refresh = this.refresh.bind(this);
        this.fetchrooms = this.fetchrooms.bind(this);

    }

    componentDidMount(){
        this.fetchrooms();
    }

    fetchrooms =() =>{
        const apiUrl_update = 'http://localhost:5000/getrooms';
        fetch(apiUrl_update)
            .then(response => response.json())
            .then(data => {
                console.log('Successfully got rooms:', data);
                this.setState({rooms:data});
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    refresh = (e) => {
        this.fetchrooms();
        e.preventDefault();
        const rooms = [...this.state.rooms];
        this.render(
            <div className="group-rooms">
                {rooms.map((room)=>{
                    return (
                        <p>{room.name}</p>
                    )
                })}
            </div>
        // console.log("hi");
        )
    }
    createRoom = (e) => {
        e.preventDefault();
        this.setState({
            name:'',
        })
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name:this.state.name})
        };
        const apiUrl = 'http://localhost:5000/newgroup';
        fetch(apiUrl, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                this.refresh(e);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    render(){
        console.log(this.state.rooms)
        const handle=this.props.handle;
        const rooms = this.state.rooms.map(room=>{
            return <ListGroupItem>
                <div className="room-item">
                    <div className="room-name">{room.name}</div>
                    <button class="button button--skoll"><Link to={"/chat/grp/room?id="+room._id+"&handle="+handle} className="no-decoration"><span>Join</span></Link></button>
                </div>
                </ListGroupItem>
        });
        return(
            <div className="rooms">
                <div className="center row">
                <div class="form__group field">
                <input type="input" class="form__field" placeholder="Name" name="name" id='name' required 
                    value={this.state.name} onChange={(e)=>{this.setState({name:e.target.value})}} />
                <label for="name" class="form__label">Room's Name</label>
                </div>
                <button class="button button--bestia">
                    <div class="button__bg"></div><span onClick={(e)=>{this.createRoom(e)}}>Create Room</span>
                </button>
                </div>
                
                <div className="refresh-btn"><Button color="primary" onClick={this.refresh}>Refresh</Button></div>

                <ListGroup>
                    {rooms}
                </ListGroup>
            </div>
        )
    }
}

export default Rooms;
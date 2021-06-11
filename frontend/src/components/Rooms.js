import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button, Form, FormGroup, Label, Input } from 'reactstrap';

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
        const rooms = this.state.rooms.map(room=>{
            return <ListGroupItem>
                    {room.name}
                    <Button color="primary" onClick={(e)=>{e.preventDefault(); this.props.join(room.id); }}>Join</Button>
                </ListGroupItem>
        });
        return(
            <div className="rooms">
                <Form inline>
                    <FormGroup>
                        <Label for="group-name" hidden>Email</Label>
                        <Input type="text" name="group-name" id="group-name" placeholder="Enter Group's Name" value={this.state.name}
                            onChange={(e)=>{this.setState({name:e.target.value})}} />
                    </FormGroup>
                    {' '}
                    <Button onClick={(e)=>{this.createRoom(e)}} >Create Room</Button>
                    </Form>
                <Button color="primary" onClick={this.refresh}>Refresh</Button>
                <ListGroup>
                    {rooms}
                </ListGroup>
            </div>
        )
    }
}

export default Rooms;
import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button, Form, FormGroup, Label, Input } from 'reactstrap';

class Rooms extends Component {

    constructor(props){
        super(props);
        this.state = {
            rooms:[],
            name:'',
        }
    }

    componentDidMount(){
        // get list of rooms and save them in state
    }

    createRoom = (e) => {
        e.preventDefault();
        // create a room
    }

    refresh = () => {
        // Refresh the rooms list
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
                        <Input type="text" name="group-name" id="group-name" placeholder="Enter Group's Name"
                            onChange={(e)=>{this.setState({name:e.target.value})}} />
                    </FormGroup>
                    {' '}
                    <Button onClick={(e)=>this.createRoom(e)} >Create Room</Button>
                    </Form>
                <Button color="primary" onClick={(e)=>{e.preventDefault(); this.refresh();}}>Refresh</Button>
                <ListGroup>
                    {rooms}
                </ListGroup>
            </div>
        )
    }
}

export default Rooms;
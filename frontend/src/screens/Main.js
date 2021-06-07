import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import queryString from 'query-string';
import {Button} from 'reactstrap';
import { Nav, NavItem, NavLink } from 'reactstrap';

import OneToOne from './OneToOne';
import OneToMany from './OneToMany';

class Main extends Component{

    constructor(props){
        super(props);
        this.state ={
            bool:true,
        };
        toast.configure();
    }

    render(){
        const {handle} = queryString.parse(this.props.history.location.search);
        return(
            <div className="wrapper">
                <div className="main-chat">
                
                <div className="container join-container-chat">
                    <Nav tabs>
                    <NavItem>
                    <NavLink active={this.state.bool} onClick={()=>{this.setState({bool:true})}} >Chat with a person</NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink active={!this.state.bool} onClick={()=>{this.setState({bool:false})}} >Chat in a group</NavLink>
                    </NavItem>
                    </Nav>
                    <div className="row">
                        <p >{handle}</p>
                        <a href="/">
                            <Button color="danger" light className="exit" >Leave</Button>
                        </a>
                    </div>
                </div>

                {this.state.bool?<OneToOne handle={handle} /> : <OneToMany handle={handle} /> }
                    
                </div>
            </div>
        )
    }
}

export default Main;
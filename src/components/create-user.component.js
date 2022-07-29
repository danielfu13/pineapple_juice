import React, { Component } from "react";


export default class CreateUsers extends Component {
    constructor(props) {
        super(props);

        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        this.state = {
            username: '',
            
        }
    }

    onChangeUserName(e) {
        this.setState({
            username: e.target.value
        });
    }
    render() {
        return (
            <div>
                <p>You are on the Create Users Component!</p>
            </div>
        )
    }
}
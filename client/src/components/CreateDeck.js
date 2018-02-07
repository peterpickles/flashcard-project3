import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class CreateDeck extends Component {
    constructor(props) {
        super(props)
        this.state = {
            deckName: ''
        }
    }


    handleNewDeckSubmit = (e) => {
        e.preventDefault();        
        console.log('###createdeck user submit',this.props)
        axios.post('/component/newDeck', {
            deckName: this.state.deckName,
            id: this.props.user.id
        }).then( () => { 
            console.log('got added successfully', this.state.deckName);
            this.props.addNewDeck(this.state.deckName);
        })
    }

    handleDeckNameChange = (e) => {
        this.setState({ deckName: e.target.value })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleNewDeckSubmit}>
                    <input name="name" placeholder="Enter Deck Name here" value={this.state.deckName} onChange={this.handleDeckNameChange} required></input>
                    <button className="btn btn-secondary" type="submit"> + </button>

                </form>
            </div>
        )
    }
}

export default CreateDeck;

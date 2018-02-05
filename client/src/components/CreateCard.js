import React, { Component } from 'react';
import axios from 'axios';
// import { Redirect } from 'react-router-dom';

class CreateCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cardQuestion: '',
            cardAnswer: ''
        }
    }


    handleNewCardSubmit = (e) => {
        e.preventDefault();
        console.log('###card user submit', this.props.deck._id, this.props.user.id)
        axios.post('/component/newCard', {
            cardAnswer: this.state.cardAnswer,
            cardQuestion: this.state.cardQuestion,
            deckId: this.props.deck._id,
            user: this.props.user
        }).then(response => {
            console.log('Successfully added a new card', response);
            console.log('setting deck to', this.props.deck.name);
            this.props.addNewCard(this.props.deck.name, this.state.cardQuestion, this.state.cardAnswer);
        }).catch(err => {
            console.log('what happened?', err);
            
        })

    }

    handlecardQuestionChange = (e) => {
        this.setState({ cardQuestion: e.target.value })
    }

    handlecardAnswerChange = (e) => {
        this.setState({ cardAnswer: e.target.value })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleNewCardSubmit}>
                    <input name="name" placeholder="question" value={this.state.cardQuestion} onChange={this.handlecardQuestionChange} required></input>
                    <input name="name" placeholder="answer" value={this.state.cardAnswer} onChange={this.handlecardAnswerChange} required></input>
                    <button className="btn btn-secondary" type="submit"> add card </button>
                </form>
            </div>
        )
    }
}

export default CreateCard;
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom'


class Quiz extends Component {
    constructor(props){
        super(props);
        this.state = {
            cardDisplay: true,
            i: 0
        }
    }

    handleCardDisplay = () => {
        this.setState({
            cardDisplay: !this.state.cardDisplay
        })
    }
    nextCardClick = (e) => { 
        console.log(this.state.i)       
        this.setState({
            i: this.state.i + 1
        })
    }
    prevCardClick = (e) => {
        console.log(this.state.i)
        this.setState({
            i: this.state.i - 1
        })
        console.log(this.state.i)
    }


    render() {
        console.log('this is props', this.props)
        if (this.props.currentDeck.cards[this.state.i] === undefined){
            return(
                <div>
                    <h2>GO MAKE SOME CARDS!</h2>
                    <Button> Go Make some cards </Button>
                </div>
            )
        }
        else if (this.state.cardDisplay && this.state.i == 0) {
            return (
                <div>
                    <h2>{this.props.currentDeck.cards[this.state.i].question}</h2>
                    <Button bsStyle='info' onClick={event => this.handleCardDisplay(event)}>Answer</Button>
                    <Button bsStyle='info' onClick={event => this.nextCardClick(event)}>Next Card</Button>
                </div>
            )
        }
        else if (!this.state.cardDisplay && this.state.i == 0 ){
            return (
                <div>
                    <h2>{this.props.currentDeck.cards[this.state.i].answer}</h2>
                    <Button bsStyle='info' onClick={event => this.handleCardDisplay(event)}>Question</Button>               
                </div>
            )
        } 
        else if (this.state.cardDisplay && this.state.i > 0) {
            return(
                <div>
                    <h2>{this.props.currentDeck.cards[this.state.i].question}</h2>
                    <Button bsStyle='info' onClick={event => this.handleCardDisplay(event)}>Answer</Button>
                    <Button bsStyle='info' onClick={event => this.nextCardClick(event)}>Next Card</Button>
                    <Button bsStyle='info' onClick={event => this.prevCardClick(event)}>Prev Card</Button>
                </div>
            )
        }
        else if (!this.state.cardDisplay&& this.state.i > 0){
            return(
                <div>
                    <h2>{this.props.currentDeck.cards[this.state.i].answer}</h2>
                    <Button bsStyle='info' onClick={event => this.handleCardDisplay(event)}>Question</Button>
                </div>
            )

        }
        else{
            return(
                <div>
                    <h2>{this.props.currentDeck.cards[this.state.i].question}</h2>
                    <Button bsStyle='info' onClick={event => this.handleCardDisplay(event)}>Answer</Button>
                    <Button bsStyle='info' onClick={event => this.nextCardClick(event)}>Next Card</Button>
                    <Button bsStyle='info' onClick={event => this.prevCardClick(event)}>Prev Card</Button>
                </div>

            )

        }
    }
}

export default Quiz;



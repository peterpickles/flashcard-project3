import React, {Component} from 'react';
// import Cards from './Cards.js';
// import { Redirect } from 'react-router-dom';
// import axios from 'axios';
import { Button } from 'react-bootstrap';

class Deck extends Component {
    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         cards: this.props.deck
    //     }
    // }

    handleAddNewCard (event) {
        console.log ("NEW CARD CLICKED");
    }

     render () {
        console.log('HEY PETE THIS IS PROPS',this.props.deck);

        const oneCard = this.props.deck.cards.map( (card, index) => {
            return(
                <div className = 'Card-container' data-key={index}>
                question: {card.question}
                answer: {card.answer}
                </div>
            );
        });
            
       
        return (
            <div className='deck-container'>
                <Button bsStyle='info' onClick={ this.handleAddNewCard}>Add New card</Button>
                {/* return to all cards button */}
                {oneCard}
            

                
                

            </div>
        )
    }
}

export default Deck;

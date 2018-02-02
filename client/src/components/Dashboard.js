import React, {Component} from 'react';
import Sidenav from '../layout/Sidenav.js';
import CreateDeck from './CreateDeck.js';
import CreateCard from './CreateCard.js';
import Notecard from './Notecard.js';
import { Button } from 'react-bootstrap';
import { runInThisContext } from 'vm';
import { Redirect } from 'react-router-dom';



class Dashboard extends Component {
    constructor(props) {
        super(props);
        // dummy data
        this.state = {
            isOverview: true,
            //write current object into new variable
            currentDeck: {},
            allDecks: this.props.user ? this.props.user.decks : [],
        } //close state
        // this bindings
        this.handleViewDeckClick = this.handleViewDeckClick.bind(this)
    } //close constructor

handleViewDeckClick (event) {
    let dataKey = event.target.parentNode;
    console.log('####', dataKey.getAttribute('data-key'));
    let deckIndex = dataKey.getAttribute('data-key');
    let currentDeck = this.props.user.decks[deckIndex]
    this.setState(
        {
            isOverview: !this.state.isOverview,
            currentDeck: currentDeck
        }
    );
}

handleDeckDeleteClick (event) {
    console.log ("delete click");
}

addNewDeck = (newDeckName) => {
    console.log('got to parent; setting state');
    let decks = this.state.allDecks;
    decks.push({ cards: [], name: newDeckName});
    console.log('decks is', decks);
    this.setState({ allDecks: decks });
}



allDecks = () =>{
    console.log(this.state.allDecks);    
    let mapDecks = this.state.allDecks.map((deck, index) => {
        return (
            <div className="single-deck" data-key={index}>
                Deck: {deck.name}
                <br />
                <Button bsStyle='info' onClick={event => this.handleViewDeckClick(event)}>View Deck</Button>
                <Button bsStyle='danger' onClick={this.handleDeckDeleteClick}>Delete</Button>
            </div>
        );
    });
    return (
    <div>
    <CreateDeck user={this.props.user} addNewDeck={this.addNewDeck} />
    { mapDecks }
    </div> 
    )
}

singleDeck = () => {
       // let mapCards = this.state.allDecks[0].cards.map((card, index) => {
    //     return (
    //         <div className="single-deck" data-key={index}>
    //             Card: {card[0].question}
    //             <br />
    //             <Button bsStyle='info' onClick={event => this.handleViewDeckClick(event)}>View Deck</Button>
    //             <Button bsStyle='danger' onClick={this.handleDeckDeleteClick}>Delete</Button>
    //         </div>
    //     );
    // });
    let mapCards = [];
    this.state.allDecks.forEach((item) => {
        // console.log(item, "this is the item in teh for each")
       let thing = item.cards.map((card, index) => {
           console.log("this is the individual card object", card)
           console.log('LOOK HERE', index)
            return (
                <div className="single-deck" data-key={index}>
                    Card: {card.question}
                    <br />
                    <Button bsStyle='info' onClick={event => this.handleAddCardClick(event)}>Add Card</Button>
                    <Button bsStyle='danger' onClick={this.handleDeckDeleteClick}>Delete</Button>
                </div>
            );
        });
        mapCards.concat(thing);
        // console.log(mapCards, "this is map cards inside of the for each ", thing)
    });
    console.log("#######So Why Dont You Slide",mapCards);
    return (
        <div>
            <CreateCard user={this.props.user} deck={this.state.currentDeck}/>
            {mapCards}
        </div>
    )
}

//func onclick => event, get parent to get key, look in decks and set state of current deck to 
    render () {
        if (!this.props.user || !this.props.user.email) {
           return (<Redirect to='/' />);
        } else {
            return(
                <div>
                    <h2>This is da Dashboard yo!</h2>
                    <Sidenav />
                    {this.state.isOverview ? this.allDecks() : this.singleDeck()}
                      
                    <Notecard />
                </div>
            )
        }   
    }
}

export default Dashboard;

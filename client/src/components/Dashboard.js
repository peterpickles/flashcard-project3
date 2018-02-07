import React, {Component} from 'react';
import Sidenav from '../layout/Sidenav.js';
// import CreateDeck from './CreateDeck.js';
import CreateCard from './CreateCard.js';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { runInThisContext } from 'vm';
import { Redirect } from 'react-router-dom';



class Dashboard extends Component {
    constructor(props) {
        super(props);
        // dummy data
        this.state = {
            display: '',
            allDecks: this.props.user ? this.props.user.decks : []
        } //close state
        // this bindings
        this.handleViewDeckClick = this.handleViewDeckClick.bind(this);
        this.handleDeckDeleteClick=this.handleDeckDeleteClick.bind(this);
        this.handleCardDeleteClick = this.handleCardDeleteClick.bind(this);
    } //close constructor

    componentDidMount = () => {
        //Set default display to all
        this.setState({ display: this.allDecks() });
    }
    handleViewDeckClick (event) {
    let dataKey = event.target.parentNode;
    let deckIndex = dataKey.getAttribute('data-key');
    let currentDeck = this.props.user.decks[deckIndex];
    this.setState({ 
        display: this.singleDeck(currentDeck.name)
    });
    console.log("This is my current Deck", currentDeck);
    }
    handleViewALLDeckClick (event) {
        console.log('View all decks!! clicked');
        this.setState({ display: this.allDecks()});
    }
    handleDeckDeleteClick  = (e) => {
        e.preventDefault();
        let dataKey = e.target.parentNode;
        let deckIndex = dataKey.getAttribute('data-key');
        let currentDeck = this.props.user.decks[deckIndex]
        let decks = this.state.allDecks;
        this.setState({ allDecks: decks });
        

        console.log('DECK ID ######',currentDeck._id, 'userid is', this.props.user.id);
        axios.delete('/component/removedeck', {
            data: {
                deckId: currentDeck._id,
                userId: this.props.user.id
            }
        }).then(response => {
            console.log('updated currentdeck',currentDeck)
            // this.setState({ allDecks: decks });
            // this.setState({ display: this.allDecks()})
        });
    }
    handleQuizClick = (e) =>{
        e.preventDefault();        
        this.props.showQuiz(this.props.user.decks[e.target.id])

    }
    handleCardDeleteClick = (e) => {
        e.preventDefault();

        console.log("CLICKED");
        // console.log('new all decks', currentDeck);
        // let dataKey = e.target.parentNode;
        // let cardIndex = dataKey.getAttribute('data-key');
        // let currentCard = this.state.cards;
        // console.log('this is currentDeck',currentCard);

        // let decks = this.state.allDecks;
        // this.setState({ allDecks: decks });
        // console.log('this is currentDeck',currentDeck);
        // console.log('Card ID ######',currentDeck.cards._id);
        // axios.delete('/component/askForLessCards', {
        //     data: {
        //         cardId: currentDeck.cards._id,
        //         userId: this.props.user.id
        //     }
        // }).then(response => {
        //     console.log('updated currentdeck', currentDeck)
        // });
    }
handleEditCardClick (event) {
    console.log("edit card clicked");
}
addNewDeck = (newDeckName) => {
    console.log('got to parent; setting state');
    let decks = this.state.allDecks;
    decks.push({ cards: [], name: newDeckName});
    console.log('decks is', decks);
    this.setState({ allDecks: decks, display: this.allDecks() });
}
addNewCard = (deckName, cardQ, cardA) => {
    console.log('adding new card', deckName, cardQ, cardA);
    let deck = this.state.allDecks.filter(d => {
        return d.name === deckName;
    });
    if(deck){
        deck[0].cards.push({ question: cardQ, answer: cardA});
    }
    this.setDeck(deckName);
}

setDeck = (deckName) => {
    console.log('SetDeck function reached', deckName);
    this.setState({ display: this.singleDeck(deckName)});
}

allDecks = () =>{
    console.log(this.state.allDecks);    
    let mapDecks = this.state.allDecks.map((deck, index) => {
        return (
            <div className="single-deck" data-key={index}>
                {/* create a div or spot of # image to populate on the left, */}
                {/* <div className="hashtag-deck"><h2>#</h2></div> */}
                {/* put class area deck name and position left center with font styles */}
                <h2 className="deck-name"> Deck: {deck.name} </h2>
                {/* add color bar for far right edge: eventually tags for organizing */}
                <br />
                <Button bsStyle='info' onClick={event => this.handleViewDeckClick(event)} id={index}>View Deck</Button>
                <Button bsStyle='info' onClick={e => this.handleQuizClick(e)} id={index}>QUIZ MODE</Button>
                
                <Button bsStyle='danger' onClick={e => this.handleDeckDeleteClick(e)}>Delete</Button>
            </div>
        
        );
    });
    return (
    <div>
    {/* <CreateDeck  user={this.props.user} addNewDeck={this.addNewDeck} /> */}
    { mapDecks }
    </div> 
    )
}

singleDeck = (deckName) => {
    let mapCards = [];
    let currentDeck = {};
    // let currentCard = {};
    this.state.allDecks.forEach((item) => {
       if(deckName === item.name){
            currentDeck = item;
            let thing = item.cards.map((card, index) => {
                console.log("this is the individual card object", card)
                console.log('index of card going into thing', index)
                return (
                    <div className="single-card" data-key={index}>
                        <div className="card-q">Question: {card.question}</div>
                        <div className="card-a">Answer: {card.answer}</div>
                        
                        
                        {/* <br /> */}
                        {/* <Button bsStyle='info' onClick={e => this.handleEditCardClick(e)}>Edit Card</Button>
                        <Button bsStyle='danger' onClick={e => this.handleCardDeleteClick(e)}>Delete</Button> */}
                    </div>
                );
            });
            mapCards.push(thing);
       }
    });
    console.log("new mapCards", mapCards);
    console.log('current deck after thing pushed', currentDeck);            
    
    return (
        <div>
            <Button bsStyle='info' onClick={event => this.handleViewALLDeckClick(event)}>ALL DECKS</Button>
            <h2>Showing cards for: {deckName}</h2>
            <CreateCard user={this.props.user} deck={currentDeck} addNewCard={this.addNewCard}/>
            {mapCards}
        </div>
    )
}

//func onclick => event, get parent to get key, look in decks and set state of current deck to 
    render () {
        if (!this.props.user || !this.props.user.email || this.props.user.id === undefined) {
           return (<Redirect to='/' />);
        } else {
            return(
                <div>
                    <h2>Hello, {this.props.user.name}.</h2>
                    <Sidenav decks={this.props.user.decks} singleClick={this.setDeck} user={this.props.user} addNewDeck={this.addNewDeck} />
                    { this.state.display }
                    {/* <Notecard /> */}
                

                </div>
            )
        }   
    }
}

export default Dashboard;

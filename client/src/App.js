import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import Dashboard from './components/Dashboard.js';
import CreateDeck from './components/CreateDeck.js';
import Quiz from './components/Quiz.js';
import Notecard from './components/Notecard.js';
import Details from './components/Details.js';
import Deck from './components/Deck.js';
import Cards from './components/Cards.js';
import Flash from './layout/Flash.js';
// import Footer from './layout/Footer.js';
import Welcome from './WelcomePage.js';
import Nav from './layout/Nav.js';
import Login from './auth/Login.js';
import Profile from './Profile.js';
import Signup from './auth/Signup.js';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: {}
    }
  }
  componentDidMount = () => {
    this.getUser();
  }

  getUser = () => {
    // If there is a token in localStorage
    let token = localStorage.getItem('mernToken');
    if (token === 'undefined' || token === null || token === '' || token === undefined) {
      localStorage.removeItem('mernToken');
      this.setState({
        token: '',
        user: null
      });
    } else {
      //   Validate the token against the server
      axios.post('/auth/me/from/token', {
        token: token
      }).then(response => {
        //   Store the token and user
        localStorage.setItem('mernToken', response.data.token);
        this.setState({
          token: response.data.token,
          user: response.data.user
        });
        //   Pass User into child components and display main app
      }).catch(err => {
        // Both the JWT and db errors will be caught here
        console.log('cdm', err);
        this.setState({
          token: '',
          user: null
        });
      })
    }
  }

  setFlash = (t, msg) => {
    this.setState({
      flash: msg,
      flashType: t
    });
  }

  cancelFlash = () => {
    this.setState({
      flash: '',
      flashType: ''
    });
  }
  render() {
    console.log('#####', this.state);
    return (
      <div className="App">
        <Router>
          <div>
            <Nav user={this.state.user} updateUser={this.getUser} />
            <div className="space">
              <Flash flashType={this.state.flashType} flash={this.state.flash} setFlash={this.setFlash} cancelFlash={this.cancelFlash} />
              <Route exact path="/" component={
                () => (<Welcome user={this.state.user} setFlash={this.setFlash} updateUser={this.getUser} />)} />
              <Route path="/login" component={
                () => (<Login user={this.state.user} setFlash={this.setFlash} updateUser={this.getUser} />)} />
              <Route path="/signup" component={
                () => (<Signup user={this.state.user} setFlash={this.setFlash} updateUser={this.getUser} />)} />
              <Route path="/profile" component={
                () => (<Profile user={this.state.user} setFlash={this.setFlash} />)} />
              <Route path="/Dashboard" component={
                () => (<Dashboard user = {this.state.user} setFlash={this.setFlash} updateUser={this.getUser} />)} />
              <Route path="/Quiz" component={Quiz} />
              <Route path="/Notecard" component={Notecard} />
              <Route path="/Details" component={Details} />
              <Route path="/Deck" component={Deck} />
              <Route path="/CreateDeck" component={
                () => (<CreateDeck user={this.state.user} setFlash={this.setFlash} updateUser={this.getUser} />)} />
              <Route path="/Cards" component={Cards} />
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

//user component that changes state to render different page 
//parent handler to accompany it
export default App;

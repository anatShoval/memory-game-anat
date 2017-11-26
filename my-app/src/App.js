import React, { Component } from 'react';
import Board from './Board';
import Player from './Player';
import IntroductionAndSettings from './IntroductionAndSettings';
import './App.css';
import RadioBtns from './RadioBtns';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numCards: 6,
      stepNumber: 0,
      numPlayers: 1,
      startedGame: false,
      player1: "Player1",
      player2: "Player2",
      history: [{
        cards: Array(6*6).fill(null),
      }],
    };
  }

  switchNameHandlerP1 = (event) =>{
    this.setState({
      player1: event.target.value
    });
  }
  switchNameHandlerP2 = (event) =>{
    this.setState({
      player2: event.target.value
    });
  }

  setPlayersHandler = (num) => {
    this.setState({
      numCards: this.state.numCards,
      numPlayers: num,
    });
  }

  startGameHandler = () => {
    
    this.setState({
      startedGame: true,
    });
  }

  handleOptionChange(value) {
    
    this.setState({
      numSquares: value,
      history: [{
        cards: Array(value*value).fill(null),
      }],
      stepNumber: 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];

    const showGameState = this.state.startedGame === false ? <IntroductionAndSettings
      setPlayersHandler={this.setPlayersHandler}
      player1={this.state.player1}
      player2={this.state.player2}
      numPlayers={this.state.numPlayers}
      player1Changed={this.switchNameHandlerP1}
      player2Changed={this.switchNameHandlerP2} 
      startGameHandler={this.startGameHandler}
      numCards={this.numCards}
      onChange={(value) => this.handleOptionChange(value)}
    /> : <Board
          cards={current.cards}
          numCards={this.state.numCards}
          selectedCards = {this.selectedCards}
        />;
        <RadioBtns
        onChange={(value) => this.handleOptionChange(value)}
      />;
    return (
      <div className="App">
        {showGameState}
      </div>
    );
  }
}

export default App;

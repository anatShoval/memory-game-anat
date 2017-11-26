import React, { Component } from 'react';
import Board from './Board';
import Player from './Player';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numCards: 6,
      stepNumber: 0,
      numPlayers: 1,
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

  render() {

    const history = this.state.history;
    const current = history[this.state.stepNumber];
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Memory Game Exercise</h1>
        </header>
          <ul className="App-intro">
            <li>step 1: 6 X 6, one player, rules: if two cards are the same, they disappear.</li>
            <li>step 2: two players w/scoring.</li>
            <li>step 3: choose size of board at startg</li>
            <li>step 4 (bonus): undo</li>
          </ul>

          <h2>"Choose single/two players mode:"</h2>
          <button onClick= {this.setPlayersHandler.bind(this, 1)} >Single player mode</button>
          <button onClick= {this.setPlayersHandler.bind(this, 2)} >Tow players mode</button>

          <Player
            player1={this.state.player1}
            player2={this.state.player2}
            numPlayers={this.state.numPlayers}
            player1Changed={this.switchNameHandlerP1}
            player2Changed={this.switchNameHandlerP2} 
          />

          <Board
              cards={current.cards}
              numCards={this.state.numCards}
              selectedCards = {this.selectedCards}
            />
      </div>
    );
  }
}

export default App;

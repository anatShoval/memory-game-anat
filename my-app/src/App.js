import React, { Component } from 'react';
import Board from './Board';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numCards: 6,
      stepNumber: 0,
      numPlayers: 1,
      history: [{
        cards: Array(6*6).fill(null),
      }],
    };
  }

  singlePlayersHandler = () => {
    this.setState({
      numCards: this.state.numCards,
      numPlayers: 1,
    });
  }

  multiPlayersHandler = () => {
    this.setState({
      numCards: this.state.numCards,
      numPlayers: 2,
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
          <button onClick= {this.singlePlayersHandler} >Single player mode</button>
          <button onClick= {this.multiPlayersHandler} >Tow players mode</button>

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

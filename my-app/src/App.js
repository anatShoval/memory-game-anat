import React, { Component } from 'react';
import Board from './Board';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numCards: 6,
      stepNumber: 0,
      history: [{
        cards: Array(6*6).fill(null),
      }],
    };
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

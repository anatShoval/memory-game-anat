import React, { Component } from 'react';
import Board from './Board';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numCards: 6,
      stepNumber: 0,
      selectedCards: [null,null],
      setClass: "closedCard",
      history: [{
        cards: Array(6*6).fill(null),
      }],
    };
  }

  handleClick(i, value) {

    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const cards = current.cards.slice();
    
    let myCards = this.state.cards
    //myCards[i] = value;
    let newSelCards = !this.state.selectedCards[0] ? [i,this.state.selectedCards[1]] : !this.state.selectedCards[1] ? [this.state.selectedCards[0], i] : [i,null];
    this.setState({
      selectedCards: newSelCards,
    })
    /*
    this.setState({
      history: history.concat([{
        cards: cards,
      }]),
      stepNumber: history.length,
      selectedCards: newSelCards,
    });*/
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
              onClick={(i, value) => this.handleClick(i)}
              numCards={this.state.numCards}
              setClass = {this.setClass}
              selectedCards = {this.selectedCards}
            />
      </div>
    );
  }
}

export default App;

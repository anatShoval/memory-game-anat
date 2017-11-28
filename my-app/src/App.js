import React, { Component } from 'react';
import Board from './Board';
import IntroductionAndSettings from './IntroductionAndSettings';
import './App.css';
//import RadioBtns from './RadioBtns';

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
        cards: [],
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
    const num = this.state.numCards;
    let numList = Array.from(new Array(num*num), (x,i) => i+1)
    const myRandom = (num) => Math.floor((Math.random() * (num*num)) + 1);
    let contentCards = Array.from(new Array((num*num)/2), (x,i) => {
      let continueRandom = true
      x = myRandom(num);
      i = myRandom(num);
      while(continueRandom === true){
        if(numList[x-1] === x){
          numList[x-1] = "";
          while(continueRandom === true){
            if(numList[i-1] === i){
              numList[i-1] = "";
              continueRandom = false;
            }
            else{
              i = myRandom(num);
            }
          }
        }
        else{
          x = myRandom(num);
        }
      }
        return [x,i];
    });

    const itemList = ["❤", "☻", "♛", "✪", "☼", "✡", "ツ", "⌛", "☯", "⚔", "✎", "☎", "✄", "♫", "♁", "❣", "☠", "♂", "❂", "⚥", "✌", "⁉", "⌚", "☃", "☢", "☂", "♚", "✈", "➳", "∞", "⚜", "❥"]
    let counter = 0;

    for (const value of contentCards) {
      for (const step of value){
        numList[step-1] = itemList[counter]
      }
      counter++;
    }
    this.setState({
      history: [{
        cards: numList,
      }],
      startedGame: true,
    })
  }

  handleOptionChange(value) {
    
    this.setState({
      numCards: value,
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
      player1Changed={(value) => this.switchNameHandlerP1(value)}
      player2Changed={(value) => this.switchNameHandlerP2(value)} 
      startGameHandler={this.startGameHandler}
      numCards={this.state.numCards}
      onChange={(value) => this.handleOptionChange(value)}
    /> : <Board
          cards={current.cards}
          numCards={this.state.numCards}
          selectedCards = {this.selectedCards}
          player1 = {this.state.player1}
          player2 = {this.state.player2}
          numPlayers = {this.state.numPlayers}
        />;
    return (
      <div className="App">
        {showGameState}
      </div>
    );
  }
}

export default App;

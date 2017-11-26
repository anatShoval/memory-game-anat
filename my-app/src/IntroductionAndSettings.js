import React, { Component } from 'react';
import Player from './Player';
import './App.css';

function IntroductionAndSettings(props) { 
    return (
      <div>
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
          <button onClick= {props.setPlayersHandler.bind(props, 1)} >Single player mode</button>
          <button onClick= {props.setPlayersHandler.bind(props, 2)} >Tow players mode</button>

          <Player
            player1={props.player1}
            player2={props.player2}
            numPlayers={props.numPlayers}
            player1Changed={props.switchNameHandlerP1}
            player2Changed={props.switchNameHandlerP2} 
          />

          <button onClick= {props.startGameHandler} >Start Game</button>
          
      </div>
    );
}

export default IntroductionAndSettings;

import React from 'react';
import Player from './Player';
import RadioBtns from './RadioBtns';
import './App.css';

function IntroductionAndSettings(props) { 
  
    return (
      <div>
        <header className="App-header">
          <h1 className="App-title">Memory Game</h1>
          <p>This is a memory game, for singler player or versus a friend.</p>
          <img id="raccoonPic" src={require('./images/raccoon2.png')}/>
          <img id="foxPic" src={require('./images/adorable2.png')}/>

        </header>
          <ul className="App-intro">
            <li>In this game you need to find pairs of cards that are identical.</li>
            <li>In a single mode, every try you'll make will be counted therefore your goal will be to find all of the pairs in minimum tries possible.</li>
            <li>In two players mode, your goal will be to collect more cards then your opponent.</li>
          </ul>

          <h2>"Choose single/two players mode:"</h2>
          <button className="defaultBtn" onClick= {props.setPlayersHandler.bind(props, 1)} >Single player mode</button>
          <button className="defaultBtn" onClick= {props.setPlayersHandler.bind(props, 2)} >Tow players mode</button>

          <Player
            player1={props.player1}
            player2={props.player2}
            numPlayers={props.numPlayers}
            player1Changed={(value) => props.player1Changed(value)}
            player2Changed={(value) => props.player2Changed(value)} 
          />

          <RadioBtns
            onChange={(value) => props.onChange(value)}
          />
          <br />
          
          <button className="defaultBtn" onClick= {props.startGameHandler} >Start Game</button>
          <br />
          <br />
          <br />
          <br />
      </div>
    );
}

export default IntroductionAndSettings;

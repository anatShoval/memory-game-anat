import React from 'react';
import './Player.css';

function Player(props) {
    const numP = 
      props.numPlayers === 1 ? React.createElement('div', {className:"playerStyle"}, React.createElement('input', {type:"text", onChange:props.player1Changed, value:props.player1})) :
      React.createElement('div', {className:"playerStyle"}, React.createElement('input', {type:"text", onChange:props.player1Changed, value:props.player1}), React.createElement('input', {type:"text", onChange:props.player2Changed, value:props.player2})) 
    return (
      numP
    );
  }

export default Player;
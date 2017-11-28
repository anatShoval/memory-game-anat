import React from 'react';
import './Player.css';

function Player(props) {
    const numP = 
      props.numPlayers === 1 ? React.createElement('div', {className:"playerStyle"}, 
      React.createElement('input', {type:"text", onChange:props.player1Changed.bind(this), defaultValue:props.player1})) :
      React.createElement('div', {className:"playerStyle"}, React.createElement('input', {type:"text", onChange:props.player1Changed.bind(this), defaultValue:props.player1}), 
      React.createElement('input', {type:"text", onChange:props.player2Changed.bind(this), defaultValue:props.player2}));
      //defaultValue:props.player1 | value:props.player1
    return (
      numP
    );
  }

export default Player;
import React from 'react';
import './App.css';
import Card from './Card';

export default class Board extends React.Component { 

    renderCard(cardValue, cardLine) {
      const idName = "card" + cardLine
      const value = this.props.cards[cardValue]
      return (
        <Card
          id = {idName}
          value = {this.props.cards[cardValue]}
          onClick = {() => this.props.onClick(cardValue)}
          cardPic = "./backCard.png"
        />
      );
    }
  
   objectCard(num){
    //let contentCards = [(num*num)/2];
    let contentCards = new Array((num*num)/2);
    let valCard = 0;

    for (let i = 0; i < contentCards.length; i++) {
      contentCards[i] = new Array(2);
    }

    let numList = [];
    for (var i = 1; i <= num*num; i++) {
        numList.push(i);
    }

    for (let i = 0; i < contentCards.length; i++) {
      for(let j = 0; j < 2; j++){
        let x = Math.floor((Math.random() * (num*num)) + 1);
        while(True){
          if(numList[x-1] == x){
            contentCards[i][j] = x;
            numList[x-1] = "";
            break;
          }
          else{
            x = Math.floor((Math.random() * (num*num)) + 1);
          }
        } 
      }
    }

    const itemList = ["❤", "☻", "♛", "✪", "☼", "✡", "ツ", "⌛", "☯", "⚔", "✎", "☎", "✄", "♫", "♁", "❣", "☠", "♂"]
    let arrayCard = new Array[num*num];
    let createDiv = [];
    for(let i=0; i<contentCards.length; i++){
      for(let j = 0; j < 2; j++){
        
        arrayCard[contentCards[i][j]] = this.renderCard(itemList[i], i+j);
        if(i+j%6==0){
          reateDiv.push(React.createElement('dir', {className:'board-row'}, ...arrayCard));
        }
      }
    }
    return React.createElement('dir', null, ...contentCards);
    /*for(let i=0; i<num; i++){
      for(let j=0; j<num; j++){
        arrayCard.push(this.renderCard(valCard, j));
        valCard++;
      }
      contentCards.push(React.createElement('dir', {className:'board-row'}, ...arrayCard));
    }
    return React.createElement('dir', null, ...contentCards);*/
  }

    render() {
      const numCards = this.props.numCards;
      
      console.log(numCards);
      return (
        <div>
          
          <div className="boardDiv">
            {this.objectCard(numCards)};
          </div>
        </div>
      );
    }
  }
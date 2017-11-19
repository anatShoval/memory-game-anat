import React from 'react';
import './App.css';
import Card from './Card';

export default class Board extends React.Component { 

    renderCard(cardValue, cardLine) {
      const idName = "card" + cardLine;
      const x = this.props.cards[cardLine]
      const value = (x===null) ? cardValue : this.props.cards[cardLine]
      const selectedCards = this.props.selectedCards
      const mySelected = this.props.selectedCards

      const sl = (mySelected===undefined) ? "closedCard" : (mySelected[0]==cardLine || mySelected[1]==cardLine) ? "openCard" : "closedCard";
      return (
        <Card
          id = {idName}
          value = {value}
          onClick = {() => this.props.onClick(cardLine, cardValue)}
          className = {sl}
        />
      );
    }
  
   objectCard(num){
    
    let numList = Array.from(new Array(num*num), (x,i) => i+1)
    console.log(numList);

    let contentCards = Array.from(new Array((num*num)/2), (x,i) => {
      let continueRandom = true
      x = Math.floor((Math.random() * (num*num)) + 1);
      i = Math.floor((Math.random() * (num*num)) + 1);
      while(continueRandom === true){
        if(numList[x-1] === x){
          numList[x-1] = "";
          while(continueRandom === true){
            if(numList[i-1] === i){
              numList[i-1] = "";
              continueRandom = false;
            }
            else{
              i = Math.floor((Math.random() * (num*num)) + 1);
            }
          }
        }
        else{
          x = Math.floor((Math.random() * (num*num)) + 1);
        }
      }
        return [x,i];
    });

    console.log(contentCards);
    const itemList = ["❤", "☻", "♛", "✪", "☼", "✡", "ツ", "⌛", "☯", "⚔", "✎", "☎", "✄", "♫", "♁", "❣", "☠", "♂"]
    let counter = 0
    for (const value of contentCards) {
      for (const step of value){
        numList[step-1] = itemList[counter]
      }
      counter++;
    }
    console.log(numList);
    
    let createDiv = [];
    counter = 0;
    for (const value of numList){

      createDiv.push(this.renderCard(value, counter));
      counter++;
    }
    return React.createElement('div', null, ...createDiv);
    
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
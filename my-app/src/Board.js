import React from 'react';
import './App.css';
import Card from './Card';

export default class Board extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      selectedCards: [null,null],
      myCardList: [],
      classNames: Array(props.numCards*props.numCards).fill("closedCard"),
    };
  }
  
    renderCard(cardValue, cardLine) {
      const idName = "card" + cardLine;
      const x = this.props.cards[cardLine]
      const value = (x===null) ? cardValue : this.props.cards[cardLine]
      return (
        <Card
          id = {idName}
          value = {value}
          onClick={(i, value) => this.handleClick(cardLine, cardValue)}
          className = {this.state.classNames[cardLine]}
        />
      );
    }

    
    
    handleClick(i, value) {
          
      let myCards = this.state.myCardList;
      let myClassNames = this.state.classNames;

      const setNewState = ((newSelCards, myCards,  myClassNames) => {
        this.setState({
          selectedCards: newSelCards,
          myCardList: myCards,
          classNames: myClassNames,
        })
      });

      var moreThenTowSelected = myClassNames.filter((word) => { return word === "openCard"; });
      if(moreThenTowSelected.length < 2){
          if (myClassNames[i] === "closedCard"){
            myClassNames[i] = "openCard";
          }
        
            let newSelCards = !this.state.selectedCards[0] ? [value+"_"+i,this.state.selectedCards[1]] : (!this.state.selectedCards[1] && this.state.selectedCards[0]!== value+"_"+i) ? [this.state.selectedCards[0], value+"_"+i] : [value+"_"+i,null];
            
            const checkPairs = (newSelCards[0]!==newSelCards[1] && (newSelCards[0]) && (newSelCards[1])) ? (newSelCards[0].slice(0, 1) === newSelCards[1].slice(0, 1)) ? true : false : false;
            
            setNewState(newSelCards, myCards,  myClassNames)

            if(checkPairs){
              setTimeout(() => {
               /* myCards.splice(newSelCards[0].slice(2,),1);
                myClassNames.splice(newSelCards[0].slice(2,),1);
                myCards.splice(newSelCards[1].slice(2,),1);
                myClassNames.splice(newSelCards[1].slice(2,),1);*/
                
                myClassNames[newSelCards[0].slice(2,)] = "lockedCard";
                myClassNames[newSelCards[1].slice(2,)] = "lockedCard";
                setNewState(newSelCards, myCards,  myClassNames)
              }, 1000);
      
            }
            else if ((newSelCards[0]) && (newSelCards[1])){
              setTimeout(() => {
                myClassNames[newSelCards[0].slice(2,)] = "closedCard";
                myClassNames[newSelCards[1].slice(2,)] = "closedCard";
                
                setNewState(newSelCards, myCards,  myClassNames)
              }, 1000);
            }
            else{
              setNewState(newSelCards, myCards,  myClassNames)
            }
      }
      
    }

   objectCard(num){
    
    let numList = Array.from(new Array(num*num), (x,i) => i+1)

    const myRandom = (num) => Math.floor((Math.random() * (num*num)) + 1);

    if(this.state.myCardList.length===0) {
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

      const itemList = ["❤", "☻", "♛", "✪", "☼", "✡", "ツ", "⌛", "☯", "⚔", "✎", "☎", "✄", "♫", "♁", "❣", "☠", "♂"]
      let counter = 0;

      for (const value of contentCards) {
        for (const step of value){
          numList[step-1] = itemList[counter]
        }
        counter++;
      }

      this.setState({
        myCardList : numList,
      })
    }
    else
    {
      numList = this.state.myCardList
    }
    
    let createDiv = [];
    let counter = 0;
    for (const value of numList){

      createDiv.push(this.renderCard(value, counter));
      counter++;
    }
    return React.createElement('div', null, ...createDiv);
    
  }

    render() {
      return (
        <div>
          
          <div className="boardDiv">
            {this.objectCard(this.props.numCards)};
          </div>
        </div>
      );
    }
  }
import React from 'react';
import './App.css';
import Card from './Card';

export default class Board extends React.Component { 
  constructor(props) {
    const arrayLength = props.numCards
    super(props);
    this.state = {
      selectedCards: [null,null],
      myCardList: [],
      classNames: Array(arrayLength*arrayLength).fill("closedCard"),
    };
  }
  
    renderCard(cardValue, cardLine) {
      const idName = "card" + cardLine;
      const x = this.props.cards[cardLine]
      const value = (x===null) ? cardValue : this.props.cards[cardLine]
      

     // const mySelected = this.props.selectedCards

     // const sl = (mySelected===undefined) ? "closedCard" : (mySelected[0]==cardLine || mySelected[1]==cardLine) ? "openCard" : "closedCard";
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
      let myClassName = "closedCard";
      myClassNames[i] === "closedCard" ? myClassNames[i] = "openCard" : myClassNames[i] = "closedCard"
      //this.state.selectedCards[0]!=null ? 
      //myCards[i] = value;
      let newSelCards = !this.state.selectedCards[0] ? [value+"_"+i,this.state.selectedCards[1]] : !this.state.selectedCards[1] ? [this.state.selectedCards[0], value+"_"+i] : [value+"_"+i,null];
      
      const checkPairs = (newSelCards[0]!=newSelCards[1] && (newSelCards[0]) && (newSelCards[1])) ? (newSelCards[0].slice(0, 1) === newSelCards[1].slice(0, 1)) ? true : false : false;
      //const indexP = Array.from(new Array(2), (x,i) => ((checkPairs(newSelCards)) ? myCards.findIndex(value) : false));

      setTimeout(() => { 
        if(checkPairs){
          myCards.splice(newSelCards[0].slice(2,),1);
          myClassNames.splice(newSelCards[0].slice(2,),1);
          myCards.splice(newSelCards[1].slice(2,),1);
          myClassNames.splice(newSelCards[1].slice(2,),1);
          //myClassNames = Array(arrayLength*arrayLength).fill("closedCard"),;
          // myCards[newSelCards[1].slice(2,)] = "";
        }
        if ((newSelCards[0]) && (newSelCards[1]) && checkPairs===false){
          myClassNames[newSelCards[0].slice(2,)] = "closedCard";
          myClassNames[newSelCards[1].slice(2,)] = "closedCard";
        }
        this.setState({
          selectedCards: newSelCards,
          myCardList: myCards,
          classNames: myClassNames,
        })

        this.setState({
          selectedCards: newSelCards,
          myCardList: myCards,
          classNames: myClassNames,
        })
      }, 1000);
      console.log(newSelCards[0].slice(2)); 

      this.setState({
        selectedCards: newSelCards,
        myCardList: myCards,
        classNames: myClassNames,
      })
    }

    

   objectCard(num){
    
    let numList = Array.from(new Array(num*num), (x,i) => i+1)
    console.log(numList);

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

      
  
      console.log(contentCards);
      const itemList = ["❤", "☻", "♛", "✪", "☼", "✡", "ツ", "⌛", "☯", "⚔", "✎", "☎", "✄", "♫", "♁", "❣", "☠", "♂"]
      let counter = 0;

      for (const value of contentCards) {
        for (const step of value){
          numList[step-1] = itemList[counter]
        }
        counter++;
      }
      console.log(numList);
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
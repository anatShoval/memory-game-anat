import React from 'react';
import './App.css';
import Card from './Card';

export default class Board extends React.Component { 
  constructor(props) {
    const cardNum = props.numCards;
    const np = props.numPlayers;
    super(props);
    this.state = {
      selectedCards: [null,null],
      myCardList: props.cards,
      classNames: Array(cardNum*cardNum).fill("closedCard"),
      numPlayers: np,
      counterMoves: 0,
      players1Turn:true,
      players1Collections: 0,
      players2Collections: 0,
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

      const setNewState = ((newSelCards, myCards,  myClassNames, cm, turn, collection) => {
        this.setState({
          selectedCards: newSelCards,
          myCardList: myCards,
          classNames: myClassNames,
          counterMoves: cm,
          players1Turn: turn,
          players1Collections: collection,
        })
      });

      const setNewState2 = ((newSelCards, myCards,  myClassNames, cm, turn, collection) => {
        this.setState({
          selectedCards: newSelCards,
          myCardList: myCards,
          classNames: myClassNames,
          counterMoves: cm,
          players1Turn: turn,
          players2Collections: collection,
        })
      });

      var moreThenTowSelected = myClassNames.filter((word) => { return word === "openCard"; });
      if(moreThenTowSelected.length < 2){
          if (myClassNames[i] === "closedCard"){
            myClassNames[i] = "openCard";
          }
        
            let newSelCards = !this.state.selectedCards[0] ? [value+"_"+i,this.state.selectedCards[1]] : (!this.state.selectedCards[1] && this.state.selectedCards[0]!== value+"_"+i) ? [this.state.selectedCards[0], value+"_"+i] : [value+"_"+i,null];
            
            const checkPairs = (newSelCards[0]!==newSelCards[1] && (newSelCards[0]) && (newSelCards[1])) ? (newSelCards[0].slice(0, 1) === newSelCards[1].slice(0, 1)) ? true : false : false;
            
            setNewState(newSelCards, myCards,  myClassNames, this.state.counterMoves, this.state.players1Turn, this.state.players1Collections)

            if(checkPairs){
              setTimeout(() => {
                myClassNames[newSelCards[0].slice(2,)] = "lockedCard";
                myClassNames[newSelCards[1].slice(2,)] = "lockedCard";
                const collection =  this.state.players1Turn ? this.state.players1Collections + 1 : this.state.players2Collections +1;
                this.state.players1Turn ? setNewState(newSelCards, myCards,  myClassNames, this.state.counterMoves, this.state.players1Turn, collection) :
                setNewState2(newSelCards, myCards,  myClassNames, this.state.counterMoves, this.state.players1Turn, collection)
              }, 1000);
      
            }
            else if ((newSelCards[0]) && (newSelCards[1])){
              setTimeout(() => {
                myClassNames[newSelCards[0].slice(2,)] = "closedCard";
                myClassNames[newSelCards[1].slice(2,)] = "closedCard";
                const cm = this.state.counterMoves +1;
                const turn = this.state.players1Turn ? false : true;
                setNewState(newSelCards, myCards,  myClassNames, cm, turn, this.state.players1Collections)
              }, 1000);
            }
            else{
              setNewState(newSelCards, myCards,  myClassNames, this.state.counterMoves, this.state.players1Turn, this.state.players1Collections)
            }
      }
      
    }

   setCard=()=>{
    const numList = this.state.myCardList;
    let createBtn = [];
    let createDiv = [];
    let counter = 0;
    for (const value of numList){

      createBtn.push(this.renderCard(value, counter));
      counter++;
      if(counter%this.props.numCards===0){
        createDiv.push(React.createElement('div', {className:'cardsRow'}, ...createBtn));
        createDiv.push(React.createElement('br'))
        createBtn = [];
      }
    }
    return React.createElement('div', null, ...createDiv);
    
  }

  
  restartGame=()=>{
    const finAllCards = this.state.classNames.filter(word => word === "lockedCard").length;
    if(finAllCards===this.state.myCardList.length){return <button className="restartBtn" onClick= {this.props.restartGameHandler} >New game</button>};
  }
    render() {
      const finAllCards = this.state.classNames.filter(word => word === "lockedCard").length;
      
      const playerPic = this.state.numPlayers===2 ? finAllCards===this.state.myCardList.length ? 
      this.state.players1Collections > this.state.players2Collections ? 
      <img className="playersPic" src= {require('./images/raccoon.svg')}/> :
      this.state.players1Collections < this.state.players2Collections ? 
      <img className="playersPic2" src={require('./images/fox.svg')}/> :
      <div>
        <img className="playersPic" src= {require('./images/raccoon.svg')}/>
        <img className="playersPic2" src={require('./images/fox.svg')}/>
      </div> : 
      this.state.players1Turn===true ? 
      <img className="playersPic" src= {require('./images/raccoon.svg')}/> : 
      <img className="playersPic2" src={require('./images/fox.svg')}/> :
      <img className="playersPic" src= {require('./images/raccoon.svg')}/>

      
      const numP = (this.state.numPlayers===2 ? finAllCards===this.state.myCardList.length ? this.state.players1Collections > this.state.players2Collections ? this.props.player1 + " is the winer with " + this.state.players1Collections + " cards" :
      this.state.players1Collections < this.state.players2Collections ? this.props.player2 + " is the winer with " + this.state.players2Collections + " cards pairs" :
      "Even" : 
      this.state.players1Turn===true ? this.props.player1 + "'s turn, collected " + this.state.players1Collections + " cards" : 
      this.props.player2 + "'s turn, collected " + this.state.players2Collections + " cards" : 
      this.props.player1 +", moves are: " + this.state.counterMoves);
      
      return (
        <div>
          <div className="headdingGame">
            <h1>Memory Game</h1>
            {playerPic}
            <p>{numP}</p>
          </div>
          <div className="boardDiv">
            {this.setCard()}
            {this.restartGame()}
          </div>
        </div>
      );
    }
  }
import React from 'react';

function Card(props) {
    return (
      <button id={props.id} onClick={props.onClick}><img src={props.cardPic}/>
        {props.value}
      </button>
    );
  }

export default Card;
import React from 'react';

function Card(props) {
    return (
      <button id={props.id} onClick={props.onClick} className={props.className}>
        {props.value}
      </button>
    );
  }

export default Card;
import React from 'react';

function RadioBtns(props){   
        return (
            <div className="RadioBtnDiv">
               <RadioBtn value = {4} onChange = {() => props.onChange(4)} />
               <RadioBtn value = {6} onChange = {() => props.onChange(6)} />
               <RadioBtn value = {8} onChange = {() => props.onChange(8)} />            
            </div>
        );
}

function RadioBtn(props){
    return (
        <div className="radio">
            <label>
            {props.value===6 ? <input type="radio" name='radio' value={props.value} onChange = {props.onChange} defaultChecked/> : 
            <input type="radio" name='radio' value={props.value} onChange = {props.onChange}/>}       
            Board {props.value} * {props.value}
            </label>
        </div>
    );
}

export default RadioBtns;
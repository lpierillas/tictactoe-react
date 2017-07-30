import React from 'react';

const Square = props => (
    <button className={props.value === 'X' || props.value === 'O' ? 'square square-filled' : 'square'} onClick={props.onClick}>
        {props.value}
    </button>
);

export default Square;

import React from 'react';
import classes from './Button.css';

//functional component
const button = (props) => (
    <button 
    // passes a few css classes dynamically in array then it is joined into a string with spaces
    className={[classes.Button, classes[props.btnType]].join(' ')}
    onClick={props.clicked}>{props.children}</button>
);

export default button;
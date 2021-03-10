import React from 'react';

import classes from './Input.css';

const input = (props) => {


    // switch statement dynamically creates the from elements
    let inputElement = null;

    // dynamically set the css classes
    // concatenates the invalid css class if invalid prop passed and the input field has a validation set on it and touched by user
    // validation of the input is checked by the shouldValidate prop
    const inputClasses = [classes.InputElement];
    if(props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

     switch(props.elementType) {
         case('input'):
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed}/>;
            break;
         case('textarea'):
            inputElement = <textarea 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed}/>;
            break;
        case('select'):
            inputElement = (
                <select
                    className={inputClasses.join(' ')} 
                    value={props.value}
                    onChange={props.changed}>{
                        props.elementConfig.options.map(option => (
                            <option key={option.value} value={option.value}>
                                    {option.displayValue}
                            </option>
                        ))
                    }
                </select>
            );
            break;
        default:
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props} 
                value={props.value}
                onChange={props.changed}/>
            break;
     }

    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );

};

export default input;
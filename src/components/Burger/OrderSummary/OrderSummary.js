
import React from 'react';
import Aux from '../../../hoc/Auxilliary';

// functional component
const orderSummary = (props) => {
    // get ingredients transform into arraythen loop through and create list item
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{ textTransform: 'capitalize' }}>{igKey}:</span> {props.ingredients[igKey]}
                </li>
            );
        });
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>One burger with the following ingedients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to checkout?</p>
            
        </Aux>
    );
};

export default orderSummary;
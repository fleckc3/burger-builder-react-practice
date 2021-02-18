
import React from 'react';
import Aux from '../../../hoc/Auxilliary';
import Button from '../../UI/Button/Button';

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
            <p><strong>Total Price: {props.price.toFixed(2)}</strong> </p>
            <p>Continue to checkout?</p>
            <Button
                btnType="Danger"
                clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button
                btnType="Success"
                clicked={props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    );
};

export default orderSummary;
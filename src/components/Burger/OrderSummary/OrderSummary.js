
import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import Aux from '../../../hoc/Auxilliary/Auxilliary';
import Button from '../../UI/Button/Button';

// class component
    // this could be a functional component does not have to be  class

class OrderSummary extends Component {
    componentDidUpdate() {
        console.log('[OrderSummary] WillUpdate');
    }

    showCheckoutHandler = () => {

    }
   
    render () {
         // get ingredients transform into arraythen loop through and create list item
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{ textTransform: 'capitalize' }}>{igKey}:</span> {this.props.ingredients[igKey]}
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
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong> </p>
                <p>Continue to checkout?</p>
                <Button
                    btnType="Danger"
                    clicked={this.props.purchaseCancelled}>CANCEL</Button>
              
                    <Button
                        btnType="Success"
                        clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        );
    }
}

export default OrderSummary;
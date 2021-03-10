import React, {Component} from 'react';
import { Route } from 'react-router-dom';

import ContactData from './ContactData/ContactData';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: 0
    }

    componentWillMount() {
        // gets the params passed in the url
        const query = new URLSearchParams(this.props.location.search);

        // loop through and set the ingredients in an object
        const ingredients = {};
        let price = 0;
        for(let param of query.entries()) {
            // checks for price object in the array otherwise sets the ingredients
            if(param[0] === 'price') {
                price = param[1];
            } else {
                // ['salad', '1]
                ingredients[param[0]] = +param[1]
            }
         
        }

        // sets state with ingredients and price
        this.setState({ingredients: ingredients, totalPrice: price});
    }

    onCheckoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');

    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    onCheckoutCancelled={this.onCheckoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                    />
                    <Route 
                        path={this.props.match.path + '/contact-data'} 
                        // pass state variables as props throught the <ContactData/> component
                        // routeing history props passed into method and distributed with {...props} and passed to ContactData 
                        render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)} />
            </div>
        )
    }

}

export default Checkout;
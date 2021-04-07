import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import ContactData from './ContactData/ContactData';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {

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
                    ingredients={this.props.ings}
                    onCheckoutCancelled={this.onCheckoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                    />
                    <Route 
                        path={this.props.match.path + '/contact-data'} 
                        // pass state variables as props throught the <ContactData/> component
                        // routeing history props passed into method and distributed with {...props} and passed to ContactData 
                        // render={(props) => (<ContactData ingredients={this.props.ings} price={this.props.price} {...props} />)}
                        component={ContactData} />
            </div>
        )
    }

}

const mapStateToProps =  state => {
    return {
        ings: state.ingredients
    }
};

export default connect(mapStateToProps)(Checkout);
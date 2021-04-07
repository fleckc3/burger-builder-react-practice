
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxilliary/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from  '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';

// const  INGREDIENT_PRICES = {
//     salad: 0.5,
//     cheese: 0.4,
//     meat: 1.3, 
//     bacon: 0.7
// };

// stateful component
class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }

    // local UI state
    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        console.log(this.props);

        // axios.get('https://burger-builder-28bc3-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json')
        // .then(response => {
        //     this.setState({ingredients: response.data});
        // })
        // .catch(error => {
        //     this.setState({error: true});
        // });
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    updatePurchaseState(ingredients) {
        // create array of strings for ingredients
        // map method loops through and replaces with value for the given key
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        })
        // turn array into single num, sum of all ingredients
        // function called on each item in the mapped array
        // el is the element returned just above this
        .reduce((sum, el) => {
            return sum + el;
        }, 0);

        // // sets purchaseable to false or true depending on the sum value being greater than 0
        // this.setState({purchasable: sum >  0});
        return sum > 0;
    }

    purchaseContinuedHandler = () => {
        // const queryParams = [];

        // // loops through the state of the ingredients
        // // encodes to be sent in URI --> ingredient property name = its property value
        // for(let i in this.state.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        // }

        // // passes the total price
        // queryParams.push('price=' + this.state.totalPrice);

        // // create query string out of the queryParams array with '&' between them
        // // added to the search param
        // const queryString = queryParams.join('&');

        this.props.history.push( '/checkout' );
    }

    render () {
        // creates variable to disable the less button if ingredient is 0 or less
        // copies the state of the ingredients into new variable disabledInfo
        const disabledInfo = {
            ...this.props.ings
        };
        // loop through ingredients and check if <= 0
        // creates object like this {salad: true, meat: false, ...}
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />

        if(this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved} 
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}/>
                </Aux>
            );

            orderSummary =  <OrderSummary
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler} 
                purchaseContinued={this.purchaseContinuedHandler}
                ingredients={this.props.ings}/>
        }

        if(this.state.loading) {
            orderSummary = <Spinner />
        }
        
        return (
            <Aux>
                <Modal 
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}
const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
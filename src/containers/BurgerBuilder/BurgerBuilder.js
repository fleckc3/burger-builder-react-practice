
import React, { Component } from 'react';

import Aux from '../../hoc/Auxilliary/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from  '../../hoc/withErrorHandler/withErrorHandler';

const  INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3, 
    bacon: 0.7
};

// stateful component
class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('https://burger-builder-28bc3-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json')
        .then(response => {
            this.setState({ingredients: response.data});
        })
        .catch(error => {
            this.setState({error: true});
        });
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

        // sets purchaseable to false or true depending on the sum value being greater than 0
        this.setState({purchasable: sum >  0});
    }

    purchaseContinuedHandler = () => {
        // alert('You can continue!');
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients, 
            price: this.state.totalPrice,
            customer: {
                name: 'Colin Fleck', 
                adddress: {
                    street: 'test Street',
                    zipCode: '2222', 
                    country: 'USA'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({loading: false, purchasing: false});
            })
            .catch(error => {
                console.log(error);
                this.setState({loading: false, purchasing: false});
            });
    }

    // updates the ingredients and price in state via type
    addIngredientHandler = (type) => {
        const oldCount =  this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount =  this.state.ingredients[type];
        if(oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    render () {
        // creates variable to disable the less button if ingredient is 0 or less
        // copies the state of the ingredients into new variable disabledInfo
        const disabledInfo = {
            ...this.state.ingredients
        };
        // loop through ingredients and check if <= 0
        // creates object like this {salad: true, meat: false, ...}
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />

        if(this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler} 
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}/>
                </Aux>
            );

            orderSummary =  <OrderSummary
                price={this.state.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler} 
                purchaseContinued={this.purchaseContinuedHandler}
                ingredients={this.state.ingredients}/>
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

export default withErrorHandler(BurgerBuilder, axios);
import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {

    //orderform constructed so that it validates the data and how it should look like
    state = {
        orderForm: {
            name: {
                // defines html element
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            }, 
            street: {
                // defines html element
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            }, 
            zipCode: {
                // defines html element
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            }, 
            country: {
                // defines html element
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            }, 
            email: {
                // defines html element
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            }, 
            deliveryMethod: {
                // defines html element
                elementType: 'select',
                elementConfig: {
                   options: [
                       {value: 'fastest', displayValue: 'Fastest'},
                       {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'Cheapest',
                validation: {},
                valid: true
            }, 
        },
        formIsValid: false,
        loading: false
    }

    orderHandler = (event) => {
        // prevents request to reload page from the button click in the form
        event.preventDefault();
                    
        this.setState({loading: true});

        const formData = {};
        // loops through orderform and creates key value pairs
        for(let formElementIdentifier in this.state.orderForm) {
            // [name: 'value'], [email: 'email@email.com],.... 
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;

        }

        const order = {
            ingredients: this.props.ingredients, 
            price: this.props.price,
            orderData: formData
        }

        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({loading: false});
                
                //redirect to base url once order sent successfully
                this.props.history.push('/');
            })
            .catch(error => {
                console.log(error);
                this.setState({loading: false});
            });
    }

    // event listener for input changes
    inputChangedHandler = (event, inputIdentifier) => {

        // clone copy of order form
        const updatedOrderForm = {
            ...this.state.orderForm
        };

        // go deeper into order form -> clone nested part of order form
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };

        // updates the nested orderform value to whatever value is input in from field
        updatedFormElement.value = event.target.value;

        // updates valid value by using the checkform validation method by passing value and its rules
        updatedFormElement.valid = this.checkFormValidity(updatedFormElement.value, updatedFormElement.validation);

        // this updates the input to show that it has been touched by the user
        // this is used to only show the invalid css class on the input
        updatedFormElement.touched = true;

        // updates cloned order form at the specific identifier and updates it with the above target value
        updatedOrderForm[inputIdentifier] = updatedFormElement

        console.log(updatedFormElement);

        // 
        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm) {
            // checks if given input is valid and also if formIsValid is true
            // if the input is false and formIsValid is true then formIsValid set to false
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }


        // set state for order from with updated values and sets whether the overal form is valid
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    // form validation method
    checkFormValidity(value, rules) {
        let isValid = true;

        // if required set to true
        // value.trim() removes white space and compared to make sure it is not equal to empty string --> true or false
        // then isValid is set to boolean of the check
        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        //true or false
        return isValid;
    }

    render () {
        // takes orderForm state and creates it into an array
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            // id: "name", config: {elementConfig object}
            // id: "email", config: {elementConfig object}
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key],
            })
        }

       // console.log(formElementsArray);


        let form = (
            <form onSubmit={this.orderHandler}>
                {/* dynamically output the form fields with two-way binding */}
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id} 
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
            );

        if(this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;
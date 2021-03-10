import React, { Component } from 'react';


import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

// outputs orders
class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    // fetch orders when loaded
    componentDidMount() {
        axios.get('/orders.json')
            .then(response => {
                // console.log(response.data);

                // takes response, loops though and gets data at each key
                // and is push()ed into the fetchedOrders[] along with the id = key
                const fetchedOrders = [];
                for (let key in response.data) {
                    fetchedOrders.push({
                        ...response.data[key],
                    id: key});
                }
                this.setState({loading: false, orders: fetchedOrders});
            })
            .catch(err => {
                this.setState({loading: false});

            });
    }
    render () {
        return (
            <div>
               {this.state.orders.map(order => (
                   <Order 
                   key={order.id}
                   ingredients={order.ingredients}
                   price={+order.price} />
               ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);
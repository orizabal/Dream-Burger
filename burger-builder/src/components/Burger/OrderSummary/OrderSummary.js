import React, { Component } from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    // Can be a functional component, doesn't have to be a class
    componentWillUpdate() {
        console.log('[OrderSummary] Will Update')
    }


    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
        return (
        <li key={igKey}>
            <span style={{textTransform: 'capitalize'}}>{igKey}</span>:{this.props.ingredients[igKey]}
        </li>)
        })
        return (
        <Auxiliary>
            <h3>Your Order</h3>
            <p>Your delicious burger has the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total:</strong> ${this.props.price}</p>
            <p>Continue to Checkout?</p>
            <Button 
                clicked={this.props.purchaseCancelled}
                btnType={"Danger"}>Back</Button>
            <Button 
                clicked={this.props.purchaseContinued}
                btnType={"Success"}>Continue</Button>
        </Auxiliary>
        );
    }
}

export default OrderSummary;
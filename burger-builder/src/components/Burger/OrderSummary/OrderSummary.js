import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => {
        return (
        <li key={igKey}>
            <span style={{textTransform: 'capitalize'}}>{igKey}</span>:{props.ingredients[igKey]}
        </li>)
    })
    return (
        <Auxiliary>
            <h3>Your Order</h3>
            <p>Your delicious burger has the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total:</strong> ${props.price}</p>
            <p>Continue to Checkout?</p>
            <Button 
                clicked={props.purchaseCancelled}
                btnType={"Danger"}>Back</Button>
            <Button 
                clicked={props.purchaseContinued}
                btnType={"Success"}>Continue</Button>
        </Auxiliary>
    )
}

export default orderSummary;
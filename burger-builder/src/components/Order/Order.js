import React from 'react';
import classes from './Order.module.css';

const order = (props) => {
    const ingredients = [];

    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        })
    }

    const ingredientOutput = ingredients.map(ig => {
        return <span 
            key={ig.name}
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: 'none',
                padding: '5px',
                backgroundColor: 'rgb(227, 227, 227)',
                borderRadius: '7px'
            }}>{ig.name} ({ig.amount})</span>
    })

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>CAD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
        );
};

export default order;
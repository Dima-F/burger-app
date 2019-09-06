import React from 'react';
import styles from './Order.module.css';

export default function Order(props) {
    const ingredientsArray = [];

    for(let name in props.ingredients) {
        ingredientsArray.push({
            name,
            amount: props.ingredients[name]
        });
    }

    const ingredientsOutput = ingredientsArray.map(ing => {
        return (
            <span key={ing.name} style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                padding: '5px',
                border: '1px solid #ccc'
            }}>
                {ing.name} ({ing.amount})
            </span>
        );
    })
    return (
        <div className={styles.Order}>
            <p>Ingredients: {ingredientsOutput}</p>
            <p>Price: <strong>USD {props.price}</strong></p>
        </div>
    )
}

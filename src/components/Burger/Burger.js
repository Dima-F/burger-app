import React from 'react';
import styles from './Burger.module.css';
import BurgerIngradient from './BurgerIngradient/BurgerIngradient';
import { withRouter } from 'react-router-dom';

const burger = (props) => {
    let transformedIngradients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_,i)=><BurgerIngradient key={igKey + i} type={igKey} />
            );
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);
    if (transformedIngradients.length === 0) {
        transformedIngradients = <p>Please start adding ingradients!</p>
    }
    return (
        <div className={styles.Burger}>
            <BurgerIngradient type="bread-top" />
            {transformedIngradients}
            <BurgerIngradient type="bread-bottom" />
        </div>
    );
};

export default withRouter(burger);